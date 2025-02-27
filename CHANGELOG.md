# Changelog

All notable changes to this project will be documented in this file.

**For detailed release notes, please refer to the [GitHub
releases](https://github.com/elastic/synthetics/releases) page.**

## v1.0.0-beta.33 (2022-09-06)

- Issue individual requests when pushing monitors to Kibana. This is to avoid
  timeout issues when monitors are pushed without streaming support #586

## v1.0.0-beta.32 (2022-08-24)

### Features

- Improve the scaffolding experience of `init` command by setting up a brand new
  synthetics project by automatically connecting to your Kibana instance. With
  this, creating synthetics monitors and pushing them to Kibana becomes a lot
  easier #566

```sh
npx @elastic/synthetics init [project]

cd <project> && SYNTHETICS_API_KEY=<api-key> npm run push
```

Setting up the project is a one time operation, Once the init command is done,
Synthetics agent stores the project releated settings under `project.json` file.
From then, users can push all the synthetics monitors by specifying just the
authentication key. If users want to push the monitors under different Kibana
instance, project, spaces etc. They can do so by passing the CLI options
explicitly.

```sh
npx @elastic/synthetics --url <url> --project <name> --space <kibana-spaces>
```

- Introduce a new CLI command `locations` to list all the available public
  and private locations for running synthetic monitoring across the globe #571

```sh
// List all the available global locations managed by Elastic for
// running synthetics monitors
npx @elastic/synthetics locations


// List all managed locations as well as custom private locations
npx @elastic/synthetics locations --url <kibana-host> --auth <api-key>
```

- Warns when users accidently trying to push same sets of monitors
  under different project name #566
- Push command now can display progress in the terminal whenever monitors are
  created, updated and deleted along with errors #576

### Bug Fixes

- Report error when monitors with duplicate ids are pushed to Kibana #568
- Allow CLI sub commands(push, locations, init) to receive common options #572
- Bundled push monitor contents must be idempotent, this caused performance
  issues in the Kibana side when monitors were updated everytime user ran the
  push command #579
- Report warnings in the terminal when Kibana fails to delete stale monitors #565

## v1.0.0-beta.31 (2022-07-27)

### Features

- Expose request context as part of the Journey if you want to make calls to the
  HTTP API of your application #555

### Bug Fixes

- Push command fails to push the monitors in windows platform #553

## v1.0.0-beta.30 (2022-06-28)

### Bug fixes

- Use fixed playwright version to avoid running in to dependency issues #540

## v1.0.0-beta.29 (2022-06-21)

### Bug fixes

- Setup github workflow template correctly #529
- Stop pushing monitors on bundle errors #530
- Delete stale monitors by default on push command #534
- Allow controlling timeouts via actions #532
- Remove trailing slash from Kibana host #536

## v1.0.0-beta.28 (2022-06-13)

### Features

- Now that push only supports configurations in the current working directory, it also allows users to use the `--match`, `--pattern` and `--tags` flags to filter which journeys to push #523
- The `init` command now generates more detailed examples, and includes documentation reference #524

### Bug fixes

- Upgrade sharp version to avoid known vulnerabilities #519
- Update `source-map-support` so that we use correct filepaths when bundling and pushing monitors #520

## v1.0.0-beta.27 (2022-06-03)

### Features

- Use Kibana Uptime APIKeys instead of Basic Auth for pushing monitors #512
- Update all the available Synthetics test node locations #515
- Interactive scaffolding using the `npx @elastic/synthetics init <dir>`
  command, allows users to choose default test location and schedule for the
  monitors to be pushed to Kibana #508

### Bug fixes

- Write `.gitignore` files for scaffolding instead of managing under assets #510
- Preserve the original User-Agent string if the user configured the value and
  do not append 'Elastic/Synthetics' identifier #514
- Override the PlaywrightOptions when configured via CLI and Synthetics config
  file #517

## v1.0.0-beta.26 (2022-05-20)

### Features

- Introduce new `npx @elastic/synthetics push` command that allows users to
  manage the monitors in the Kibana Monitor Management UI from the command line #482
- Allow users to scaffolding a brand new Synthetics project from scratch using
  the `npx @elastic/synthetics init` command #502
- Custom Reporter interface that allows for more extensability when building new
  reporters for the Synthetics runner #492
- Expose monitor DSL along with journey and step that allows configuring
  each individual monitors #493

## v1.0.0-beta.25 (2022-04-12)

### Features

- Use network events emitted from playwright browser context, This would allow
  the synthetics agent to capture network requests that are part of popups and
  other page objects #488

## v1.0.0-beta.24 (2021-04-01)

### Bug fixes

- Update the playwright to version `1.20.1` to address issues related
  to core dumps #485

### Breaking Changes

- With the playwright update to version `1.20.1`, Synthetics agent offically
  dropped support for CentOS and Heartbeat images will be distributed
  based on ubuntu 20.04 which is supported by Playwright as well.

## v1.0.0-beta.23 (2022-03-23)

### Features

- Add location metadata for journeys and step #474
- Export Action type from the Synthetics formatter #454
- Enhance the synthetics formatter to control when the step begins and ends #457
- Add ability to add subcommands to the cli in #475

## v1.0.0-beta.22 (2022-03-14)

### Bug fixes

- Empty the write buffer before exit the Node.js process #446
- Reduce the network information data by writing only the
  necessary fields #466

## v1.0.0-beta.21 (2022-02-22)

### Bug fixes

- Do not override User agent string when doing device emulation #462

## v1.0.0-beta.20 (2022-02-16)

### Bug fixes

- Capture syntax errors inside inline journeys without throwing
  promise rejection errors #450

## v1.0.0-beta.19 (2022-01-31)

### Bug fixes

- Ensure `journey/end` is written to file descriptor by flushing out the
  last bytes in underlying stream #446
- Debug logs should be logged to stdout instead of using the reporter
  file descriptor #423

## v1.0.0-beta.18 (2022-01-13)

### Bug fixes

- Do not read configuration files for inline journeys unless a --config parameter is passed #426
- Stop runner from hanging indefinitely within ubuntu docker images [elastic/beats#29681] #441

## v1.0.0-beta.17 (2021-11-11)

### Breaking Changes

- Remove 'suiteparams' CLI option which was depreacted in the previous releases.
  Use `--params` instead [#406](https://github.com/elastic/synthetics/pull/406)

### Features

- Add support for `--playwright-options` CLI flag that lets user specify all
  browser and context options that Playwright supports in addition to passing it
  via `synthetics.config.js` file [#405](https://github.com/elastic/synthetics/pull/405)

### Bug fixes

- Timestamp of `journey/end` event reflects the time when the event happens instead
  of the time event was written to the output stream. This fixes issue when
  duration is calculated based on `journey/start` and `journey/end` [#409](https://github.com/elastic/synthetics/pull/409)
- Rewrite screenshot timestamp based on when screenshot was taken instead of
  when the screenshot was processed and reconstructed [#411](https://github.com/elastic/synthetics/pull/411)

## v1.0.0-beta.16 (2021-10-19)

### Bug fixes

- Revert to Playwright `1.14.0` as the newer versions of chromium
  [breaks](https://bugs.chromium.org/p/chromium/issues/detail?id=1253967&q=glibc&can=2)
  CentOS7. As a result of this revert, network events from other contexts like
  popups, iframes, tabs would not get captured [#402](https://github.com/elastic/synthetics/pull/402)

## v1.0.0-beta.15 (2021-10-14)

### Breaking Changes

- Drop support for Node 12 [#397](https://github.com/elastic/synthetics/pull/397)

### Features

- Enable trace events when invoked via Heartbeat, enables step level metrics
  like FCP, LCP and other performance metrics for all journeys [#387](https://github.com/elastic/synthetics/pull/387)
- Use network events from playwright context which captures network requests
  from iframes, new tabs, etc. [#372](https://github.com/elastic/synthetics/pull/372)
- Add default network emulation for journeys to be able to capture performance
  measurements more effectively. Default is 5Mbps download, 3Mbps Upload and 20ms latency.
  Users can control network throttling with `--throttling '10d/2u/30l'` flag or
  can disable the throttling via `--no-throttling` flag [#284](https://github.com/elastic/synthetics/pull/284)
- Add `Elastic/Synthetics` user-agent identifier to all network
  requests. This enables users to analyze traffic from Elastic Synthetic
  monitoring platform [#232](https://github.com/elastic/synthetics/pull/232)
- Introduce more assetion commands to formatter [#385](https://github.com/elastic/synthetics/pull/385)

### Bug fixes

- Account for page closing while capturing network events [#398](https://github.com/elastic/synthetics/pull/398)

## v1.0.0-beta.14 (2021-09-16)

### Bug fixes

- Bring back `--suite-params` flag support to support Heartbeat 7.15 [#379](https://github.com/elastic/synthetics/pull/379)

## v1.0.0-beta.13 (2021-09-16)

### Features

- Add step level tracing API which enables capturing performance metrics (core
  web vitals) for each navigation as part of the journey [#369](https://github.com/elastic/synthetics/pull/369)
- Capture all page errors and unhandled exceptions as part of the journeys [#374](https://github.com/elastic/synthetics/pull/374)
- Introduce synthetics script generator which can transform the recorder actions
  into code [#375](https://github.com/elastic/synthetics/pull/375)

## v1.0.0-beta.12 (2021-08-19)

### Features

- Add support for expect assertions for inline suites
  [#365](https://github.com/elastic/synthetics/pull/365)
- Add `ignore-https-errors` to the CLI to ignore any HTTPS errors during
  navigation [#361](https://github.com/elastic/synthetics/pull/361)

### Notable changes

- Bump playwright to 1.14.0
  [#366](https://github.com/elastic/synthetics/pull/366)
- Bump Node.js version to 14 [#364](https://github.com/elastic/synthetics/pull/364)

## v1.0.0-beta.11 (2021-08-09)

### Breaking Changes

- Drop support for Heartbeat 7.13
  [#354](https://github.com/elastic/synthetics/pull/354)

### Features

- Add quiet mode for Heartbeat via `--quiet-exit-code` and make
  it default for > 7.14 Heartbeat versions [#357](https://github.com/elastic/synthetics/pull/357)

## v1.0.0-beta.10 (2021-07-27)

### Bug fixes

- Record correct screenshots for popups in new tabs
  and windows [#353](https://github.com/elastic/synthetics/pull/353)
- Capture URL correctly for steps that involve navigations inside
  popups and windows [#352](https://github.com/elastic/synthetics/pull/352)

## v1.0.0-beta.9 (2021-07-13)

### Bug fixes

- Populate journey id when its not explicitly specified
  [#346](https://github.com/elastic/synthetics/pull/346)
- Remove Node.js 12 version restriction [#343](https://github.com/elastic/synthetics/pull/343)

## v1.0.0-beta.8 (2021-07-07)

### Bug fixes

- Capture screenshots correctly when using device emulation [#340](https://github.com/elastic/synthetics/pull/340)

## v1.0.0-beta.7 (2021-07-01)

### Features

- Deprecate 'suiteparams' infavor of 'params' [#331](https://github.com/elastic/synthetics/pull/331)

### Bug fixes

- Bring `--network` flag back till 7.14 is released [#336](https://github.com/elastic/synthetics/pull/336)

## v1.0.0-beta.6 (2021-06-30)

### Bug fixes

- Bring `--json` flag back till 7.14 is released [#333](https://github.com/elastic/synthetics/pull/333)

## v1.0.0-beta.5 (2021-06-30)

### Features

- Add support for passing playwright context and browser options via
  synthetics config [#317](https://github.com/elastic/synthetics/pull/317)

### Bug fixes

- Compability bug with FS apis on Node 12 [#328](https://github.com/elastic/synthetics/pull/328)
- Add fallback symbols for non utf8 support in windows [#324](https://github.com/elastic/synthetics/pull/324)

## v1.0.0-beta.4 (2021-06-28)

### Breaking Changes

- Remove -e from CLI args and use `NODE_ENV` for controlling the
  environment [#318](https://github.com/elastic/synthetics/pull/318)

### Features

- Add new screenshots options - `on|off|only-on-failure` to manage capturing
  the step screenshots [#311](https://github.com/elastic/synthetics/pull/311)
- Enable screenshot deduplication feature by default when the agent is invoked
  via Heartbeat [#322](https://github.com/elastic/synthetics/pull/322)

### Bug fixes

- Avoid creating duplicate screenshot JSON docs for each journey
  [#320](https://github.com/elastic/synthetics/pull/320)
- Associate `beforeAll` hook errors across all journeys
  [#316](https://github.com/elastic/synthetics/pull/316)
- Provide journey isolation via context [#314](https://github.com/elastic/synthetics/pull/314)

## v1.0.0-beta.3 (2021-06-15)

### Features

- Capture all core-vitals and user experience metrics like FPC, LCP, CLS, User
  timing metrics, etc via chrome tracing [#194](https://github.com/elastic/synthetics/pull/194)
- Split the captured screenshot from each step in to 64 blocks to optimzie
  the storage when indexed the same block in Elaticsearch [#290](https://github.com/elastic/synthetics/pull/290)
- Add support for filtering journeys by name and tags [#300](https://github.com/elastic/synthetics/issues/300)
- Expose `expect` assetion method in the API [#201](https://github.com/elastic/synthetics/issues/201)
- Update Cumulative Layout Shift(CLS) metric based on
  `maximum session window with 1 second gap, capped at 5 seconds`
  [#301](https://github.com/elastic/synthetics/issues/301)
- Expose time taken to complete single step under
  `step.duration.us` [#302](https://github.com/elastic/synthetics/issues/301)
- Expose new capabilities via `--capability` through CLI
  options [#295](https://github.com/elastic/synthetics/issues/295)
- Add new flag `--rich-events` which mimicks heartbeat
  behaviour [#289](https://github.com/elastic/synthetics/pull/289).
- Expose suite parameters from CLI and config file to
  all hooks and journeys callbacks[#272](https://github.com/elastic/synthetics/pull/272)

### Bug fixes

- Move all of the trace events like FCP, LCP, User timings under
  `browser.relative_trace`[#303](https://github.com/elastic/synthetics/pulls/303)
- Prioritize suite params from CLI over config file [#298](https://github.com/elastic/synthetics/pull/298)
- Report errors from `before` and `after` hooks [#273](https://github.com/elastic/synthetics/pull/273)

## v1.0.0-beta.2 (2021-05-17)

### Features

- Allow dynamic suite parameters configuration via `synthetics.config.{js|ts}`
  [#270](https://github.com/elastic/synthetics/issues/270)

### Performance Improvements

- Improve execution time of test suites by spawning journeys in isolated context
  instead of launcing browser for each run [#274](https://github.com/elastic/synthetics/issues/274)

## v1.0.0-beta.1 (2021-05-04)

### Bug fixes

- Exclude all data URI requests from network events [#267](https://github.com/elastic/synthetics/issues/267)

## v1.0.0-beta.0 (2021-04-23)

### Features

- Default to JPEG images with quality 80 for individual step
  screenshots[#233](https://github.com/elastic/synthetics/issues/233)

### Bug fixes

- Keep journey callback types to be synchronous to match with how steps are
  executed synchronously[#256](https://github.com/elastic/synthetics/issues/256)
- Report correct page URL on navigation
  failures[#255](https://github.com/elastic/synthetics/issues/255)

**NOTE: Playwright version is updated to 1.10.0**

## v0.0.1-alpha14 (2021-04-14)

### Features

- Add support for custom reporters for the Synthetics runner
  [#254](https://github.com/elastic/synthetics/issues/254)

## v0.0.1-alpha13 (2021-04-08)

### Features

- Remove duplicate payload fields and keep the network fields under ECS
  [#252](https://github.com/elastic/synthetics/issues/252)

### Bug fixes

- Measure the network timings for aborted and inflight network requests
  correctly[#251](https://github.com/elastic/synthetics/pull/251)

## v0.0.1-alpha12 (2021-03-31)

### Features

- Record transfer size and resource size for all network events
  [#220](https://github.com/elastic/synthetics/issues/220)
- Report the number of journeys as part of the new `synthetics/metadata` event
  which would be used by heartbeat eventually for sharding [#247](https://github.com/elastic/synthetics/pull/247)

## v0.0.1-alpha11 (2021-03-10)

### Features

- Expose driver type information from the agent [#239](https://github.com/elastic/synthetics/pull/239)

Exposing the types allows developers to import the driver type information
directly from the synthetics package instead of using via playwright specific
packages which would result in inconsistent types (version mismatch or
browser specific types).

## v0.0.1-alpha10 (2021-03-04)

### Features

- Move all the ECS specific fields under `root_fields` [#164](https://github.com/elastic/synthetics/issues/164)
- Add support for Junit reporter [#149](https://github.com/elastic/synthetics/issues/149)
- Expose status field for `step/end` and `journey/end` [#230](https://github.com/elastic/synthetics/issues/230)

### Bug fixes

- Disable chromium sandboxing by default
  [#225](https://github.com/elastic/synthetics/issues/225)

## v0.0.1-alpha9 (2021-02-01)

### Features

- Add runtime seccomp profiler for the synthetics agent [#181](https://github.com/elastic/synthetics/issues/181)

### Bug fixes

- Exit with non-zero code when any step/journey fails [#191](https://github.com/elastic/synthetics/issues/191)
- Calculate blocking time properly for missing network data [#187](https://github.com/elastic/synthetics/issues/187)
- Preserve typescript source fails without transpiling to older JS versions [#195](https://github.com/elastic/synthetics/issues/195)
- Capture redirected requests in network timing data [#180](https://github.com/elastic/synthetics/issues/180)
