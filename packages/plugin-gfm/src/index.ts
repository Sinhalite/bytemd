import type { BytemdPlugin } from 'bytemd';
import en from './locales/en.json';
import remarkGfm, { RemarkGfmOptions } from 'remark-gfm';
import { icons } from './icons';

export interface BytemdPluginGfmOptions extends RemarkGfmOptions {
  locale?: typeof en;
}

export default function gfm({
  locale = en,
  ...remarkGfmOptions
}: BytemdPluginGfmOptions = {}): BytemdPlugin {
  return {
    remark: (p) => p.use(remarkGfm, remarkGfmOptions),
    actions: [
      {
        title: locale.strike,
        icon: icons.strikethrough,
        cheatsheet: `~~${locale.strikeText}~~`,
        handler: {
          type: 'action',
          click({ wrapText, editor }) {
            wrapText('~~');
            editor.focus();
          },
        },
      },
      {
        title: locale.task,
        icon: icons.task,
        cheatsheet: `- [ ] ${locale.taskText}`,
        handler: {
          type: 'action',
          click({ replaceLines, editor }) {
            replaceLines((line) => '- [ ] ' + line);
            editor.focus();
          },
        },
      },
      {
        title: locale.table,
        icon: icons.table,
        handler: {
          type: 'action',
          click({ editor, appendBlock }) {
            const { line } = appendBlock(
              `| ${locale.tableHeading} |  |\n| --- | --- |\n|  |  |\n`
            );
            editor.setSelection(
              { line: line, ch: 2 },
              { line: line, ch: 2 + locale.tableHeading.length }
            );
            editor.focus();
          },
        },
      },
    ],
  };
}
