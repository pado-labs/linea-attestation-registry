import { afterEach, assert, clearStore, describe, log, test } from "matchstick-as";
import {
  ModuleRegistered as ModuleRegisteredEvent,
  ModuleRegistered,
} from "../generated/ModuleRegistry/ModuleRegistry";
import { Address, ethereum } from "@graphprotocol/graph-ts";
import { newTypedMockEvent } from "matchstick-as/assembly/defaults";
import { handleModuleRegistered } from "../src/module-registry";

describe("handleModuleRegistered()", () => {
  const moduleAddress = "0xF75BE6f9418710fd516fA82Afb3AAD07e11a0f1b";
  const moduleName = "module name";
  const moduleDescription = "module description";

  afterEach(() => {
    clearStore();
  });

  test("Should create a new Module entity", () => {
    assert.entityCount("Module", 0);

    const moduleRegisteredEvent = createModuleRegisteredEvent(moduleAddress, moduleName, moduleDescription);

    handleModuleRegistered(moduleRegisteredEvent);

    assert.entityCount("Module", 1);

    assert.fieldEquals("Module", moduleAddress, "id", moduleAddress);
    assert.fieldEquals("Module", moduleAddress, "name", moduleName);
    assert.fieldEquals("Module", moduleAddress, "description", moduleDescription);
    assert.fieldEquals("Module", moduleAddress, "moduleAddress", moduleAddress);
  });
});

function createModuleRegisteredEvent(
  moduleAddress: string,
  moduleName: string,
  moduleDescription: string,
): ModuleRegistered {
  const moduleRegisteredEvent = newTypedMockEvent<ModuleRegisteredEvent>();

  moduleRegisteredEvent.parameters.push(
    new ethereum.EventParam("moduleAddress", ethereum.Value.fromAddress(Address.fromString(moduleAddress))),
  );
  moduleRegisteredEvent.parameters.push(new ethereum.EventParam("moduleName", ethereum.Value.fromString(moduleName)));
  moduleRegisteredEvent.parameters.push(
    new ethereum.EventParam("moduleDescription", ethereum.Value.fromString(moduleDescription)),
  );

  return moduleRegisteredEvent;
}
