"""
===============================================================
 Geetham Restaurant — Data Analysis Script
 Reads exported backup JSON and generates analytics reports
===============================================================

 HOW TO USE:
  1. In the Admin Dashboard → Settings → click "Export Backup"
  2. Save the downloaded file as  geetham_backup.json
  3. Place it in the same folder as this script
  4. Run:   python geetham_analysis.py

 Requires:  pip install pandas matplotlib seaborn
===============================================================
"""

import json
import os
import sys
from datetime import datetime, timedelta
from collections import Counter

try:
    import pandas as pd
    import matplotlib.pyplot as plt
    import matplotlib.dates as mdates
    import seaborn as sns
    sns.set_theme(style="darkgrid", palette="deep")
except ImportError:
    print("Missing dependencies. Run:  pip install pandas matplotlib seaborn")
    sys.exit(1)

# ─── Load Data ────────────────────────────────────────────────
BACKUP_FILE = "geetham_backup.json"

if not os.path.exists(BACKUP_FILE):
    print(f"\n[ERROR] '{BACKUP_FILE}' not found!")
    print("  → Go to Admin Dashboard → Settings → Export Backup")
    print("  → Rename the file to 'geetham_backup.json' and place it here.\n")
    sys.exit(1)

with open(BACKUP_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

bookings_raw = data.get("bookings", [])
users_raw    = data.get("users", [])
menu_raw     = data.get("menu", [])

print(f"\n{'='*55}")
print("   GEETHAM RESTAURANT — DATA ANALYSIS REPORT")
print(f"{'='*55}")
print(f"  Exported at : {data.get('exportedAt', 'N/A')}")
print(f"  Bookings    : {len(bookings_raw)}")
print(f"  Registered  : {len(users_raw)} diners")
print(f"  Menu items  : {len(menu_raw)}")
print(f"{'='*55}\n")

if not bookings_raw:
    print("[INFO] No bookings found in backup. Add data via admin dashboard first.\n")
    sys.exit(0)

# ─── Build DataFrames ─────────────────────────────────────────
df = pd.DataFrame(bookings_raw)
df["createdAt"] = pd.to_datetime(df["createdAt"], errors="coerce")
df["date"]      = pd.to_datetime(df["date"], errors="coerce")
df["guests"]    = pd.to_numeric(df["guests"], errors="coerce").fillna(0).astype(int)

# Clean phone numbers
df["phone_clean"] = df["phone"].str.replace(r"\s+", "", regex=True)

# ─── 1. Booking Status Breakdown ──────────────────────────────
print("1.  BOOKING STATUS BREAKDOWN")
print("-" * 35)
status_counts = df["status"].value_counts()
for status, count in status_counts.items():
    pct = count / len(df) * 100
    bar = "█" * int(pct / 5)
    print(f"  {status:<12} {count:>3}  ({pct:5.1f}%)  {bar}")
print()

# ─── 2. Reservation Volume by Time Slot ───────────────────────
print("2.  POPULAR TIME SLOTS")
print("-" * 35)
slot_counts = df["timeSlot"].value_counts()
for slot, count in slot_counts.head(8).items():
    bar = "█" * count
    print(f"  {slot:<12} {count:>3}  {bar}")
print()

# ─── 3. Guest Count Distribution ──────────────────────────────
print("3.  GUEST COUNT DISTRIBUTION")
print("-" * 35)
guest_counts = df["guests"].value_counts().sort_index()
for guests, count in guest_counts.items():
    bar = "█" * count
    print(f"  {guests:>2} guests   {count:>3}  {bar}")
print(f"\n  Average party size: {df['guests'].mean():.1f} guests")
print(f"  Largest booking  : {df['guests'].max()} guests")
print()

# ─── 4. Top Diners (by booking count) ─────────────────────────
print("4.  TOP DINERS BY BOOKINGS")
print("-" * 35)
top_diners = df.groupby("name")["id"].count().sort_values(ascending=False).head(10)
for name, count in top_diners.items():
    tier = "🥇 Royal Patron" if count >= 3 else "🥈 Gourmet Diner" if count >= 1 else "New Member"
    print(f"  {name:<30} {count:>2} booking(s)  {tier}")
print()

# ─── 5. Cancellation Rate ─────────────────────────────────────
total      = len(df)
cancelled  = (df["status"] == "Cancelled").sum()
confirmed  = (df["status"] == "Confirmed").sum()
pending    = (df["status"] == "Pending").sum()
cancel_rate = cancelled / total * 100 if total > 0 else 0

print("5.  PERFORMANCE METRICS")
print("-" * 35)
print(f"  Total bookings      : {total}")
print(f"  Confirmed           : {confirmed}  ({confirmed/total*100:.1f}%)")
print(f"  Pending             : {pending}  ({pending/total*100:.1f}%)")
print(f"  Cancelled           : {cancelled}  ({cancel_rate:.1f}%)")
print(f"  Total guest covers  : {df['guests'].sum()}")
print()

# ─── 6. Registered Users ──────────────────────────────────────
if users_raw:
    print("6.  REGISTERED DINER PROFILES")
    print("-" * 35)
    for u in users_raw:
        phone   = u.get("phone", "")
        name    = u.get("name", "Unknown")
        nbookings = df[df["phone_clean"] == phone].shape[0]
        tier    = "Royal Patron" if nbookings >= 3 else "Gourmet Diner" if nbookings >= 1 else "New Member"
        print(f"  {name:<30} {phone:<15} {nbookings} bookings  [{tier}]")
    print()

# ─── 7. Menu Analysis ─────────────────────────────────────────
if menu_raw:
    print("7.  MENU CATALOG SUMMARY")
    print("-" * 35)
    df_menu = pd.DataFrame(menu_raw)
    df_menu["price_num"] = df_menu["price"].str.replace(r"[^\d]", "", regex=True).astype(float)
    cat_counts = df_menu["category"].value_counts()
    for cat, count in cat_counts.items():
        print(f"  {cat:<25} {count} items")
    available = (df_menu["status"] == "Available").sum()
    soldout   = (df_menu["status"] == "Sold Out").sum()
    print(f"\n  Available items : {available}")
    print(f"  Sold out items  : {soldout}")
    print(f"  Avg price       : ₹{df_menu['price_num'].mean():.0f}")
    print(f"  Price range     : ₹{df_menu['price_num'].min():.0f} — ₹{df_menu['price_num'].max():.0f}")
    print()

print(f"{'='*55}")
print("   Generating charts... (close each window to continue)")
print(f"{'='*55}\n")

# ═══════════════════════════════════════════════════════════════
#  CHARTS
# ═══════════════════════════════════════════════════════════════

fig, axes = plt.subplots(2, 3, figsize=(18, 10))
fig.patch.set_facecolor("#0D1B0F")
fig.suptitle("🍽️  Geetham Restaurant — Data Analysis Dashboard",
             fontsize=15, fontweight="bold", color="white", y=0.98)

COLORS = {
    "gold":      "#CFA851",
    "saffron":   "#D95A1E",
    "green":     "#2D5A42",
    "emerald":   "#22c55e",
    "amber":     "#f59e0b",
    "red":       "#ef4444",
    "bg":        "#0D2A1C",
    "text":      "#F7F4EB",
}

for ax in axes.flat:
    ax.set_facecolor(COLORS["bg"])
    ax.tick_params(colors=COLORS["text"], labelsize=8)
    for spine in ax.spines.values():
        spine.set_edgecolor("#CFA85130")

# ── Chart 1: Booking Status Pie ───────────────────────────────
ax1 = axes[0, 0]
status_vals  = [confirmed, pending, cancelled]
status_lbls  = ["Confirmed", "Pending", "Cancelled"]
status_clrs  = [COLORS["emerald"], COLORS["amber"], COLORS["red"]]
valid = [(v, l, c) for v, l, c in zip(status_vals, status_lbls, status_clrs) if v > 0]
if valid:
    vals, lbls, clrs = zip(*valid)
    wedges, _, autotexts = ax1.pie(
        vals, labels=lbls, colors=clrs, autopct="%1.0f%%",
        pctdistance=0.75, startangle=90,
        wedgeprops={"linewidth": 2, "edgecolor": COLORS["bg"]},
        textprops={"color": COLORS["text"], "fontsize": 8}
    )
    for at in autotexts:
        at.set_color(COLORS["bg"])
        at.set_fontweight("bold")
ax1.set_title("Booking Status Split", color=COLORS["gold"], fontsize=10, fontweight="bold", pad=10)

# ── Chart 2: Time Slot Popularity ────────────────────────────
ax2 = axes[0, 1]
slot_df = slot_counts.head(10)
bars = ax2.barh(slot_df.index[::-1], slot_df.values[::-1], color=COLORS["saffron"], height=0.6)
for bar in bars:
    ax2.text(bar.get_width() + 0.05, bar.get_y() + bar.get_height()/2,
             str(int(bar.get_width())), va="center", ha="left",
             color=COLORS["text"], fontsize=7)
ax2.set_title("Popular Time Slots", color=COLORS["gold"], fontsize=10, fontweight="bold")
ax2.set_xlabel("No. of Bookings", color=COLORS["text"], fontsize=8)

# ── Chart 3: Guest Count Distribution ────────────────────────
ax3 = axes[0, 2]
bars3 = ax3.bar(guest_counts.index, guest_counts.values, color=COLORS["gold"], width=0.6)
for bar in bars3:
    if bar.get_height() > 0:
        ax3.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.05,
                 str(int(bar.get_height())), ha="center", va="bottom",
                 color=COLORS["text"], fontsize=8, fontweight="bold")
ax3.set_title("Guest Count Distribution", color=COLORS["gold"], fontsize=10, fontweight="bold")
ax3.set_xlabel("No. of Guests", color=COLORS["text"], fontsize=8)
ax3.set_ylabel("Bookings", color=COLORS["text"], fontsize=8)
ax3.set_xticks(guest_counts.index)

# ── Chart 4: Bookings Over Time ───────────────────────────────
ax4 = axes[1, 0]
df_time = df.dropna(subset=["createdAt"]).copy()
df_time["day"] = df_time["createdAt"].dt.date
daily = df_time.groupby("day").size().reset_index(name="count")
if len(daily) > 1:
    ax4.plot(pd.to_datetime(daily["day"]), daily["count"],
             color=COLORS["gold"], linewidth=2, marker="o", markersize=4)
    ax4.fill_between(pd.to_datetime(daily["day"]), daily["count"],
                     alpha=0.25, color=COLORS["gold"])
    ax4.xaxis.set_major_formatter(mdates.DateFormatter("%d %b"))
    ax4.xaxis.set_major_locator(mdates.AutoDateLocator())
    plt.setp(ax4.xaxis.get_majorticklabels(), rotation=30, ha="right")
else:
    ax4.text(0.5, 0.5, "Not enough\ndate range", ha="center", va="center",
             color=COLORS["text"], fontsize=10, transform=ax4.transAxes)
ax4.set_title("Bookings Over Time", color=COLORS["gold"], fontsize=10, fontweight="bold")
ax4.set_ylabel("Daily Bookings", color=COLORS["text"], fontsize=8)

# ── Chart 5: Top Diners ───────────────────────────────────────
ax5 = axes[1, 1]
top5 = top_diners.head(5)
if not top5.empty:
    short_names = [n.split()[0] for n in top5.index]
    bars5 = ax5.bar(short_names, top5.values, color=COLORS["emerald"], width=0.5)
    for bar in bars5:
        ax5.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.05,
                 str(int(bar.get_height())), ha="center", va="bottom",
                 color=COLORS["text"], fontsize=9, fontweight="bold")
ax5.set_title("Top 5 Diners (by Bookings)", color=COLORS["gold"], fontsize=10, fontweight="bold")
ax5.set_ylabel("No. of Bookings", color=COLORS["text"], fontsize=8)
plt.setp(ax5.xaxis.get_majorticklabels(), rotation=15, ha="right")

# ── Chart 6: Menu Category Breakdown ─────────────────────────
ax6 = axes[1, 2]
if menu_raw:
    df_menu = pd.DataFrame(menu_raw)
    cat_c = df_menu["category"].value_counts()
    wedges, texts, autotexts = ax6.pie(
        cat_c.values, labels=cat_c.index, autopct="%1.0f%%",
        colors=[COLORS["gold"], COLORS["saffron"], COLORS["green"], COLORS["emerald"]],
        startangle=140, pctdistance=0.8,
        wedgeprops={"linewidth": 2, "edgecolor": COLORS["bg"]},
        textprops={"color": COLORS["text"], "fontsize": 8}
    )
    for at in autotexts:
        at.set_fontweight("bold")
        at.set_color(COLORS["bg"])
    ax6.set_title("Menu Category Split", color=COLORS["gold"], fontsize=10, fontweight="bold")
else:
    ax6.text(0.5, 0.5, "No menu data", ha="center", va="center",
             color=COLORS["text"], fontsize=10, transform=ax6.transAxes)
    ax6.set_title("Menu Category Split", color=COLORS["gold"], fontsize=10, fontweight="bold")

plt.tight_layout(rect=[0, 0, 1, 0.96])

# Save chart as PNG
output_file = "geetham_analysis_report.png"
plt.savefig(output_file, dpi=150, bbox_inches="tight",
            facecolor=fig.get_facecolor())
print(f"  ✅ Chart saved to: {output_file}")
plt.show()

print("\n  Analysis complete! 🎉\n")
