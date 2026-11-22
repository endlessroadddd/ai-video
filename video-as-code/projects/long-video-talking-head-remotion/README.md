# Lucius Transparent Overlays

## Preview

```powershell
npm.cmd install
npm.cmd run dev
```

Open Remotion Studio. The first/default composition is now:

- `YuChengLowerThird` for the transparent speaker lower-third.

The older logo/type animation is still available as `LuciusLogoType`.

## Render

```powershell
npm.cmd run render
npm.cmd run render:logo
```

`YuChengLowerThird` is a 2560x1440, 60fps, 4-second transparent overlay. It uses the uploaded reference style: a left vertical accent line in `#644FB8`, the large Recoleta name line `Yucheng L`, and the smaller `PingFang SC` regular role line `Co-founder at Lucius AI`. The text enters with a left-to-right typewriter reveal: large name first, then the smaller role line.

The render scripts export transparent ProRes 4444 `.mov` files. Use `npm.cmd run render:webm` if a transparent WebM is needed for browser playback.
