// @ts-check
import fs from 'fs-extra'
import { execSync } from 'child_process'
import svgo from 'svgo'
import * as icons from '@icon-park/svg'

const meta = {
  bytemd: {
    heading: icons.H,
    h1: icons.H1,
    h2: icons.H2,
    h3: icons.H3,
    h4: icons.LevelFourTitle,
    h5: icons.LevelFiveTitle,
    h6: icons.LevelSixTitle,
    bold: icons.TextBold,
    italic: icons.TextItalic,
    quote: icons.Quote,
    link: icons.LinkOne,
    image: icons.Pic,
    code: icons.Code,
    codeBlock: icons.CodeBrackets,
    ol: icons.OrderedList,
    ul: icons.ListTwo,
    hr: icons.DividingLine,
    source: icons.GithubOne,
    fullscreenOn: icons.FullScreen,
    fullscreenOff: icons.OffScreen,
    help: icons.Helpcenter,
    toc: icons.AlignTextLeftOne,
    close: icons.Close,
    left: icons.LeftExpand,
    right: icons.RightExpand,
    more: icons.More,
    keyboard: icons.EnterTheKeyboard,
  },
  'plugin-gfm': {
    strikethrough: icons.Strikethrough,
    task: icons.CheckCorrect,
    table: icons.InsertTable,
  },
  'plugin-math-common': {
    math: icons.Formula,
    inline: icons.Inline,
    block: icons.Block,
  },
  'plugin-mermaid': {
    mermaid: icons.ChartGraph,
  },
}

;(async () => {
  for (let [p, mapper] of Object.entries(meta)) {
    let obj = {}
    for (let [key, factory] of Object.entries(mapper)) {
      const svg = await svgo.optimize(factory({}))
      obj[key] = svg.data
    }

    fs.writeFileSync(
      `./packages/${p}/src/icons.ts`,
      `// DO NOT EDIT, generated by scripts/icon.js
      export const icons=${JSON.stringify(obj)}`
    )
  }

  execSync('npx prettier --write packages/**/*.ts')
})()
