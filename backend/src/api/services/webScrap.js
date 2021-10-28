const scrapeIt = require("scrape-it");

async function getPublisherData() {
  const elPais = await getElPaisData();
  const elMundo = await getElMundoData();
  return [...elPais, ...elMundo];
}

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();

  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return str;
}

async function getElPaisData() {
  const scrapeResult = await scrapeIt("https://elpais.com/", {
    presentations: {
      listItem: "main article",
      data: {
        title: {
          selector: "header h2 a",
        },
        description: "p",
        image: {
          selector: "figure a img",
          attr: "src",
        },
        link: {
          selector: "figure a",
          attr: "href",
        },
      },
    },
  });
  const result = [];
  scrapeResult.data.presentations.forEach((article) => {
    const newArticle = { ...article };
    if (newArticle.link) {
      newArticle.link = `https://elpais.com${newArticle.link}`;
      newArticle.source = "el Pais";
      newArticle.id = string_to_slug(newArticle.title);
      result.push(newArticle);
    }
  });

  return result.slice(0, 5);
}
async function getElMundoData() {
  const scrapeResult = await scrapeIt("https://elmundo.es/", {
    presentations: {
      listItem: "article div.ue-c-cover-content__body",
      data: {
        title: {
          selector: "header a h2",
        },
        image: {
          selector: "figure.ue-c-cover-content__figure picture img",
          attr: "src",
        },
        link: {
          selector: "header a",
          attr: "href",
        },
      },
    },
  });
  const result = [];
  scrapeResult.data.presentations.forEach((article) => {
    const newArticle = { ...article };
    if (newArticle.link) {
      newArticle.source = "el Mundo";
      newArticle.id = string_to_slug(newArticle.title);
      result.push(newArticle);
    }
  });

  return result.slice(0, 5);
}

exports.getData = getPublisherData;
