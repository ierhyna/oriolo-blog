---
path: "/node-gyp-windows-8"
title: "Установка node-gyp на Windows 8"
date: "2016-02-19"
excerpt: ""
category: "front-end"
tags: ""
series: ""
---

Для работы некоторых модулей Node.js (например, MongoDB, Sails.js, Deployd) нужна компиляция нативного кода, написанного на C++. Это возможно с помощью модуля node-gyp, который, в свою очередь, собирает V8 используя питоновский gyp. Поэтому настроить node-gyp на Windows не просто, хотя на Ubuntu Linux у меня проблем с этим не возникало. В этом посте я поделюсь своим опытом исправления ошибок, которые возникали у меня при установке node-gyp на Windows, и опишу последовательность действий, которая позволила мне заставить сборку работать.

Для установки node-gyp необходимы Python и C++. Поэтому сначала ставим:

- [Python 2.7](https://www.python.org/downloads/release/python-2710/)
- [Microsoft Visual Studio C++ 2013 for Windows Desktop Express](https://www.microsoft.com/en-gb/download/details.aspx?id=44914)
- и [Windows 7 64-bit SDK](https://www.microsoft.com/en-us/download/details.aspx?id=8279), если у вас 64-битная система.

После этого надо запустить установку node-gyp глобально:

```sh
npm install -g node-gyp
```

Если node-gyp установлен локально для проекта, то в некоторых случаях возможна ошибка **Failed at install script 'node-gyp rebuild'**, например:

```sh
npm ERR! bufferutil@1.2.1 install: `node-gyp rebuild`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the bufferutil@1.2.1 install script 'node-gyp rebuild'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the bufferutil package,
npm ERR! not with npm itself.
```

Если у вас не установлен Python, или Node.js не может его найти, возникает ошибка **Can't find Python executable "python", you can set the PYTHON env variable**:

```ps
> node-gyp rebuild
gyp info it worked if it ends with ok
gyp info using node-gyp@3.3.0
gyp info using node@5.5.0 | win32 | x64
gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
...
gyp ERR! node -v v5.5.0
gyp ERR! node-gyp -v v3.3.0
gyp ERR! not ok
```

Это лечится установкой Python 2.7 (важно ставить именно эту версию, не знаю почему, но версия 3 не поддерживается!), и указанием в терминале пути к исполняемому файлу питона:

```ps
set PYTHON=C:\Users\Irina\AppData\Local\Programs\Python\Python27\python.exe
```

Но указывать путь нужно будет каждый раз, когда вы запускаете node-gyp. Поэтому, если вы используете кастомный терминал (а я надеюсь, что вы это делаете), то лучше добавить эту команду в список команд, которые выполняются при запуске терминала.

Если не найден компилятор С++, то вы увидите ошибку **\`gyp\` failed with exit code: 1**:

```ps
> node-gyp rebuild
gyp info it worked if it ends with ok
gyp info using node-gyp@3.3.0
gyp info using node@5.5.0 | win32 | x64
gyp http GET https://nodejs.org/download/release/v5.5.0/node-v5.5.0-headers.tar.gz
gyp http 200 https://nodejs.org/download/release/v5.5.0/node-v5.5.0-headers.tar.gz
gyp http GET https://nodejs.org/download/release/v5.5.0/SHASUMS256.txt
gyp http GET https://nodejs.org/download/release/v5.5.0/win-x64/node.lib
gyp http GET https://nodejs.org/download/release/v5.5.0/win-x86/node.lib
gyp http 200 https://nodejs.org/download/release/v5.5.0/SHASUMS256.txt
gyp http 200 https://nodejs.org/download/release/v5.5.0/win-x86/node.lib
gyp http 200 https://nodejs.org/download/release/v5.5.0/win-x64/node.lib
gyp info spawn C:\Users\Irina\AppData\Local\Programs\Python\Python27\python.exe
gyp info spawn args [ 'C:\\Users\\Irina\\AppData\\Roaming\\npm\\node_modules\\node-gyp\\gyp\\gyp_main.py',
...
gyp info spawn args   '-Goutput_dir=.' ]
gyp: binding.gyp not found (cwd: C:\Users\Irina\Documents\project) while trying to load binding.gyp
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (C:\Users\Irina\AppData\Roaming\npm\node_modules\node-gyp\lib\configure.js:305:16)
gyp ERR! stack     at emitTwo (events.js:100:13)
gyp ERR! stack     at ChildProcess.emit (events.js:185:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:200:12)
gyp ERR! System Windows_NT 6.3.9600
gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Users\\Irina\\AppData\\Roaming\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd C:\Users\Irina\Documents\project
gyp ERR! node -v v5.5.0
gyp ERR! node-gyp -v v3.3.0
gyp ERR! not ok
```

Чтобы ее исправить, надо поставить Visual Studio C++ 2013 Express, ссылка на нее есть в начале поста. Имейте в виду, что это огромная среда, которая займет 6,5 гигабайт (!) места на диске (в такие моменты я особенно сильно ненавижу винду - компилятор gpp на Ubuntu в установленном виде занимает всего 17Мб). После этого надо перезагрузить компьютер, и запустить node-gyp rebuild.
