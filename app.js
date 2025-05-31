import puppeteer from "puppeteer";
import fs from "fs";

async function obtenerDatosAngularBlog() {
  //1.- Instanciar navegador
  const navegador = await puppeteer.launch({
    headless: false,
    slowMo: 1000,
  });

  //2.- Abrir una nueva pestaña en navegador
  const pagina = await navegador.newPage();

  //3.- Ir a la página web
  await pagina.goto("https://blog.angular.dev/");

  const datos = await pagina.evaluate(() => {
    const resultados = [];
    document
      .querySelectorAll("main>div:first-child>div:nth-child(2)>div>div.o.q")
      .forEach((elemento) => {
        const imagen = elemento.querySelector("img").src;
        const autor = elemento.querySelector("div>a>p").innerText;

        const titulo = elemento.querySelector("div>a>h2").innerText;
        const texto = elemento.querySelector("div>a>div>h3").innerText;
        const fecha = elemento.querySelector("div>span>div>div").innerText;
        const fechaModificada = fecha.split(`\n`);
        const data = {
          articulo: {
            titulo,
            texto,
            autor: {
              nombre: autor,
              avatar: imagen,
            },
            fecha: fechaModificada[0],
            reacctione: {
              likes: fechaModificada[1],
              comentarios: fechaModificada[2],
            },
          },
        };

        resultados.push(data);
      });
    return resultados;
  });

  console.log(datos);

  navegador.close();
}

obtenerDatosAngularBlog();
