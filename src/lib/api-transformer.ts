"use server";

type RawDataFromWiki = {
  query: {
    pages: {
      [key: number]: {
        title: string;
        revisions: [
          {
            "*": string
          }
        ]
      }
    }
  }
};


// async function fetchWord(word: string): Promise<any> {
//   const url = `https://pt.wiktionary.org/w/api.php?action=query&format=json&prop=revisions&titles=${word}&rvprop=content`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error: any) {
//     console.error(`Erro ao buscar a palavra "${word}":`, error.message);
//     throw new Error('Erro ao consultar a API do Wiktionary');
//   }
// }

// router.get('/:word', async (req: Request, res: Response) => {
//   const { word } = req.params;

//   try {
//     const rawData = await fetchWord(word);
//     const formattedData  = processarDadosWiktionary(rawData, word);
//     res.json(formattedData );
//   } catch (erro: any) {
//     res.status(500).json({ error: erro.message });
//   }
// });

// function processarDadosWiktionary(rawData: any, word: string) {
//   const pages = rawData?.query?.pages;
//   const pageId = Object.keys(pages || {})[0];
//   const content = pages?.[pageId]?.revisions?.[0]?.['*'];

//   if (!content) {
//     return { word, message: 'Nenhum resultado encontrado.' };
//   }

//   const cleanText = (text: string) => text.replace(/\[\[(.*?)\]\]/g, '$1');
//   const definitions = content.match(/# (.*?)\n/g)?.map((definitions: string) => cleanText(definitions.replace(/# /, '').trim())) || [];
//   const synonyms = content.match(/===Sinônimos===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
//     .filter((synonyms: string) => synonyms.startsWith('*'))
//     .map((synonyms: string) => cleanText(synonyms.replace('*', '').trim())) || [];

//   const expressions = content.match(/===Expressões===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
//     .filter((expressions: string) => expressions.startsWith('*'))
//     .map((expressions: string) => cleanText(expressions.replace('*', '').trim())) || [];

//   return {
//     word,
//     definitions,
//     synonyms,
//     expressions,
//   };
// }

async function getWordFromApi(word: string){
  try{
    const url = `https://pt.wiktionary.org/w/api.php?action=query&format=json&prop=revisions&titles=${word}&rvprop=content`;
    const res = await fetch(url);
    return dataFormatter(await res.json() as unknown);
  }catch(e: unknown){
    const err = e as Error;
    console.error(err.message);
    return;
  }
}

async function dataFormatter(raw: unknown){
  const data = raw as RawDataFromWiki;
  const purifyText = (text: string, regex: [ RegExp, string ]) => text.replace(/\[\[(.*?)\]\]/g, '$1').replace(regex[0], regex[1]).trim();

  for (const key in data.query.pages){
    const rawData = data.query.pages[key].revisions[0]["*"];
    const def = rawData.match(/# (.*?)\n/g)?.map((data => purifyText(data, [/# /gi, ''])));
    console.log(def);

    return {
      word: "",
      definition: "",
      synonyms: "",
      expressions: ""
    }
  }
}

export {
  getWordFromApi
}