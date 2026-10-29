// What a merged ticket really holds: one problem per way a date goes wrong. causes.ts tells the
// two swaps apart by tenant, and the desk counts every report there, where it is filed. A report the
// desk read as a one-day move (desk-notes.json) is neither swap: the date moved, it did not flip.
// It stays counted where it is filed, and counts toward its own problem as well.
import { causeOf, type Cause, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = Cause | 'one-day';

export type ProblemGroup = {
  problem: Problem | 'unplaced';
  reports: Report[];
  // Where the desk files these reports: cause → count. Differs from `problem` only for one-day.
  filedUnder: Record<string, number>;
  // What intake tagged these reports as: tag → count.
  taggedAs: Record<string, number>;
  channels: Record<string, number>;
  tenants: number;
  firstSeen: string;
  lastSeen: string;
};

const tally = (rs: Report[], key: (r: Report) => string) =>
  rs.reduce<Record<string, number>>((n, r) => ({ ...n, [key(r)]: (n[key(r)] ?? 0) + 1 }), {});

export function groupByProblem(
  reports: Report[],
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): ProblemGroup[] {
  const filed = (r: Report) => causeOf(r, tenantOf(r)) ?? 'unplaced';
  const byProblem = new Map<ProblemGroup['problem'], Report[]>();
  const add = (p: ProblemGroup['problem'], r: Report) => byProblem.set(p, [...(byProblem.get(p) ?? []), r]);
  for (const r of reports) {
    add(filed(r), r);
    if (oneDayMove.includes(r.id)) add('one-day', r);
  }
  return [...byProblem.entries()]
    .map(([problem, rs]) => {
      const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
      return {
        problem,
        reports: rs,
        filedUnder: tally(rs, filed),
        taggedAs: tally(rs, (r) => r.meta.intakeTag),
        channels: tally(rs, (r) => r.channel),
        tenants: new Set(rs.map((r) => r.tenant)).size,
        firstSeen: days[0],
        lastSeen: days[days.length - 1],
      };
    })
    .sort((a, b) => b.reports.length - a.reports.length);
}
