import { describe, it, before } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import CustomTerminal from "../../src/terminal.js";
import mockItemLineTable from "../mocks/itemLineTable.js";

describe("#Terminal", () => {
  let terminal;

  beforeEach(() => {
    terminal = new CustomTerminal();
  });

  it("should initialize table with rendering data empty", () => {
    terminal.initialize();

    const expected = [];

    expect(terminal.data).to.be.deep.equal(expected);
  });

  it("should render table with rendering data item", () => {
    terminal.initialize();
    terminal.updateTableWithNewPosition(mockItemLineTable);

    const expected = [mockItemLineTable];

    expect(terminal.data).to.be.deep.equal(expected);
  });

  it("should terminal to close", () => {
    const spy = sinon.spy(terminal, terminal.closeTerminal.name);

    terminal.initialize();
    terminal.closeTerminal();

    expect(spy.called).to.be.ok;
    expect(spy.callCount).to.be.equal(1);
  });
});
