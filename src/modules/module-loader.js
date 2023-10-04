console.log('Injected module loader!');

const modules = [
    {
        name: 'google',
        url: 'https://www.google.com/.*'
    }
]

async function loadModules()
{
    const modulesRoot = `chrome-extension://${sessionStorage.getItem('CMSI_ID')}/modules`;

    const moduleUrl = name => path => `${modulesRoot}/${name}/${path}`;

    for(const module of modules)
    {
        const regex = new RegExp(module.url);

        if(!regex.test(location.href)) continue;

        const fileUrl = moduleUrl(module.name);
        
        import(fileUrl('index.js'))
        .then(mod =>
        {
            if(!mod?.init)
            {
                console.warn(`Module '${module.name}' has no init function!`)
            }

            console.log(`Loaded module ${module.name}`);
            
            mod?.init?.();
            document.addEventListener('DOMContentLoaded', mod?.load);
        })
        .catch(err =>
        {
            console.warn(`Error loading module '${module.name}': ${err}`);
        });
    }
}

loadModules();