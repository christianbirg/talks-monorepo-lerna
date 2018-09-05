# Adapters

This folder contains helpers that wrap external dependencies following the "Hexagonal Architecture"-approach

## What

The idea is to wrap external dependencies once in an adapter and only "invoke"/"communicate" with this dependency through the adapter.

## Why

1. In the case that the external dependency has a breaking update, it is only necessary to change it in one single place (the adapter).
2. In case that we need to change the external dependency we only need to wrap the existing usage to the new external dependency.
3. It allows to change the behaviour or configuration for a external dependency in one place

## Definitions

- **External Dependencies**: are all 3rd-party libraries, e.g. everything in the [package.json](../../../../package.json) but can also be APIs (browser, environment or 3rd-party)

### Articles on Hexagonal Architecture

- ["Alistair Cockburn"-Website](http://alistair.cockburn.us/Hexagonal+architecture)
- [fideloper.com](http://fideloper.com/hexagonal-architecture)
