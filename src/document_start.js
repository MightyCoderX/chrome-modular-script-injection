'use strict'

const moduleLoaderScript = document.createElement('script');
moduleLoaderScript.src = chrome.runtime.getURL('modules/module-loader.js');
moduleLoaderScript.type = 'module';

sessionStorage.setItem('CMSI_ID', chrome.runtime.id);

(document.head || document.documentElement).append(moduleLoaderScript);