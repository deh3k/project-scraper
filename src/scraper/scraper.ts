import axios from 'axios'
import * as cheerio from 'cheerio'
import { IProject, IProjectData, IScarpOption } from '../Models/model'

const getHtml = async (url: string) => {
  const link = await axios.get(url)
  return link.data
}

const getNextPage = (href: string | undefined, type: string): number | null => {
  if (href) {
    if (type === 'url') {
      const arr = href.split('/')
      return Number(arr[arr.length - 1])
    } else {
      return Number(href.slice(href.indexOf('page=')).split('&')[0].split('=')[1])
    }
  }
  return null
}

const scrapeProduct = async ({baseUrl, url, queryParams, options}: IScarpOption, keyword: string): Promise<IProject[] | undefined> => {
  try {
    if(!keyword) {
      return undefined
    }
    
    let nextPage: number | null = 1
    let pagesCount = 2
    const result: IProject[] = []
    const proxy = "https://pika-secret-ocean-49799.herokuapp.com/"

    while (nextPage && nextPage <= pagesCount) {
      let urlScrap = ''

      if (options.pagination.type === 'url') {
        urlScrap = `${proxy}${url}/${nextPage}/${queryParams}${keyword}`
      } else {
        urlScrap = `${proxy}${url}?page=${nextPage}&${queryParams}${keyword}`
      }

      const html = await getHtml(urlScrap)
      const $ = cheerio.load(html)


      $(options.card).each((i, el) => {
        const item: IProject = {
          title: '',
          url: '',
          from: ''
        };

        (Object.keys(options.info) as (keyof IProjectData)[]).forEach((option: keyof IProjectData) => {
          item[option] = $(el)
            .find(options.info[option])
            .text()
            .replace(/^\s+|\s+$/gm, '')
        })

        item.url = `${baseUrl}${$(el)
          .find(options.url)
          .attr('href')}`

        item.from = baseUrl

        result.push(item)
      })

      if (options.totalCount?.total) {
        const countFromSite = $(options.totalCount.total).text()
        pagesCount = (Math.ceil(Number(countFromSite) / options.totalCount.perPage))

        nextPage += 1

      } else {
        const nextPageHref = $(options.pagination.nextPage).attr('href')
        nextPage = getNextPage(nextPageHref, options.pagination.type)

        pagesCount += 1
      }
    }
    
    return result
  } catch (error) {
    console.log(error)
  }
}

export const startScrapping = async (scrapOptions: IScarpOption[], keyword: string): Promise<IProject[]> => {
  const result: IProject[] = []
  for (const scrapOption of scrapOptions) {
    const a = await scrapeProduct(scrapOption, keyword)
    if(a) {
      result.push(...a)
    }
  }
  console.log(result)
  return result
}