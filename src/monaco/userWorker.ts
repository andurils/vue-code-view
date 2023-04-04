// https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046
// https://github.com/microsoft/monaco-editor/blob/HEAD/docs/integrate-esm.md#using-vite
// https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-vite-react
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import chromeTheme from './themes/chrome'
import monokaiTheme from './themes/monokai'

// @ts-ignore
self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === 'json') {
            return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
        }
        return new editorWorker();
    }
};

// init monaco
// theme
monaco.editor.defineTheme('monokai', monokaiTheme as any)
monaco.editor.defineTheme('chrome-devtools', chromeTheme as any)
// language
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    // jsx: monaco.languages.typescript.JsxEmit.React,
    // reactNamespace: 'React',
    allowJs: true,
});
// format
// https://github.com/alibaba/designable/blob/main/packages/react-settings-form/src/components/MonacoInput/format.ts