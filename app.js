import puppeteer from "puppeteer";

async function obtenerDatosAngularBlog() {
        //1.- Instanciar navegador
    const navegador = await puppeteer.launch({
        headless: false,
        slowMo: 400
    });

    //2.- Abrir una nueva pestaña en navegador
    const pagina = await navegador.newPage();

    //3.- Ir a la página web
    await pagina.goto("https://blog.angular.dev/");

    const datos = await pagina.evaluate(() => {
        const bucle = document.querySelector("main>div:first-child>div:nth-child(2)>div");
    })
}

obtenerDatosAngularBlog();