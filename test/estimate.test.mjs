import assert from "node:assert/strict";
import { test } from "node:test";
import { estimateRental } from "../src/lib/estimate.ts";

const vessel = { price: 23_000, capacity: 50, configuration: { banquet: 35, buffet: 50 } };
const selection = { date: "2027-06-17", hour: 16, hours: 2, guests: 8, catering: "none", extras: [] };

test("banquet uses the seated capacity, while buffet uses its own limit", () => {
  assert.equal(estimateRental(vessel, { ...selection, catering: "banquet", guests: 36 }), null);
  assert.equal(estimateRental(vessel, { ...selection, catering: "banquet", guests: 35 }).food, 112_000);
  assert.equal(estimateRental(vessel, { ...selection, catering: "buffet", guests: 50 }).food, 110_000);
});

test("each rental hour uses the day and time it falls in", () => {
  const beforeFriday = estimateRental(vessel, { ...selection, hour: 23 });
  assert.equal(beforeFriday.hire, 38_640 + 42_504);
  const evening = estimateRental(vessel, { ...selection, hour: 17 });
  assert.equal(evening.hire, 34_500 + 38_640);
});

test("minimum catering charge and optional service appear once in the total", () => {
  const quote = estimateRental(vessel, { ...selection, catering: "buffet", extras: ["serving", "serving"] });
  assert.equal(quote.food, 20_000);
  assert.equal(quote.extras.length, 1);
  assert.equal(quote.total, 69_000 + 20_000 + 5_000);
});

test("invalid calendar dates, durations and guest counts cannot produce an estimate", () => {
  for (const change of [{ date: "" }, { date: "2027-02-29" }, { hour: 24 }, { hours: 0 }, { hours: 13 }, { guests: 51 }]) {
    assert.equal(estimateRental(vessel, { ...selection, ...change }), null);
  }
});
