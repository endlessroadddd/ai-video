# Output Contract

Every case lives under:

`output/<case-slug>/`

The canonical stage folders are:

- `00-input/`
- `01-translation/`
- `02-constraints/`
- `03-storyboard/`
- `04-preview/`
- `05-copy/`
- `06-implementation/`
- `07-review/`
- `08-delivery/`

The new canonical short assets live in a script-first lane inside the case directory:

`output/<case-slug>/short-assets/<asset-slug>/`

The canonical script-first short-asset folders are:

- `00-concept/`
- `01-script/`
- `02-plan/`
- `03-materials/`
- `04-build/`
- `05-review/`
- `06-delivery/`

Legacy beatboard-first short assets may still exist under older folders such as:

- `01-translation/`
- `02-beatboard/`
- `03-animatic/`

Those legacy assets should remain readable, but new work should default to the script-first lane.

## Stage guarantees

- Each stage owns its own files.
- Later stages may read earlier stages, but must not silently overwrite them.
- Text and JSON outputs are first-class review artifacts and may be committed.
- Heavy preview and render binaries should be ignored by git unless explicitly curated.
- Heavy lane and short lane may coexist under the same case, but they should not overwrite each other's approvals or review artifacts.
- Script-first short assets must preserve `persistentConstraints` from script through delivery.
