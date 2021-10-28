const scrapeIt = require("scrape-it");

function getTodayAsString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
  
    return `${year}${month}${day}`
  }

async function getPublisherData () {
 const elPais = await getElPaisData();
 const elMundo = await getElMundoData();
 return [...elPais, ...elMundo];
}

async function getElPaisData() {
    const scrapeResult = await scrapeIt('https://elpais.com/', {
        presentations: {
            listItem: 'main article',
            data: {
                title: {
                    selector: 'header h2 a',
                },
                description: 'p',
                image: {
                    selector: 'figure a img',
                    attr: 'src'
                },
                link: {
                    selector: 'figure a',
                    attr: 'href'
                }
            }
        }
    });
    const result = [];
    let index = 0;
    scrapeResult.data.presentations.forEach(article => {
        const newArticle = { ...article };
        if (newArticle.link) {
            newArticle.link = `https://elpais.com${newArticle.link}`;
            newArticle.source = 'el Pais';
            newArticle.id = `${getTodayAsString()}_elPais_${index}`
            index += 1;
            result.push(newArticle);
        }
    });

    return result.slice(0, 5);
}
async function getElMundoData() {
    const scrapeResult = await scrapeIt('https://elmundo.es/', {
        presentations: {
            listItem: 'article div.ue-c-cover-content__body',
            data: {
                title: {
                    selector: 'header a h2',
            },
                image: {
                    selector: 'figure.ue-c-cover-content__figure picture img',
                    attr: 'src'
                },
                link: {
                    selector: 'header a',
                    attr: 'href'
                }
            }
        }
    });
    const result = [];
    let index = 0;
    scrapeResult.data.presentations.forEach((article) => {
        const newArticle = { ...article };
        if (newArticle.link) {
            newArticle.source = 'el Mundo';
            newArticle.id = `${getTodayAsString()}_elMundo_${index}`;
            index += 1;
            result.push(newArticle);
        }
    });

    return result.slice(0, 5);
}
  
exports.getData = getPublisherData;