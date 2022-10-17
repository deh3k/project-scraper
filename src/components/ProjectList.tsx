import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProjectItem from './ProjectItem'
import { IProject, IScarpOption } from '../Models/model'
import { startScrapping } from '../scraper/scraper'
import ProjectSkeleton from './ProjectSkeleton'

const scrapOptions: IScarpOption[] = [
  {
    baseUrl: 'https://freelance.ru',
    url: 'https://freelance.ru/project/search/pro',
    queryParams: 'c=&m=or&e=&f=&t=&o=0&o=1&q=',
    options: {
      card: '#w0 > div.project',
      url: 'h2.title a',
      info: {
        title: 'h2.title a',
        describe: 'div.box-title > a.description',
        date: 'span:nth-child(3) > time',
        cost: 'div.cost',
        term: 'div.term',
        views: 'div > span:nth-child(4)'
      },
      pagination: {
        type: 'query',
        nextPage: '#w0 > div.text-center > ul > li.next > a',
      }
    }
  },
  {
    baseUrl: 'https://freelance.habr.com',
    url: 'https://freelance.habr.com/tasks',
    queryParams: 'q=',
    options: {
      card: '#tasks_list > li.content-list__item',
      url: 'article > div > header > div.task__title > a',
      info: {
        title: 'article > div > header > div.task__title > a',
        date: 'article > div > header > div.task__params.params > span.params__published-at.icon_task_publish_at > span',
        cost: 'article > aside > div > span',
        views: 'article > div > header > div.task__params.params > span.params__views.icon_task_views > i'
      },
      pagination: {
        type: 'query',
        nextPage: '#pagination > div > a.next_page',
      }
    }
  },
]

interface IProps {
  keyword: string
}

export default function ProjectList(props: IProps) {

  const [scrapResult, setScrapResult] = useState<IProject[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    (async function () {
      setIsLoading(true)
      setScrapResult(await startScrapping(scrapOptions, props.keyword))
      setIsLoading(false)
    })()  
  }, [props.keyword])

  console.log(scrapResult)

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading && 
        [1,2,3,4,5,6].map((i) => 
          <ProjectSkeleton key={i}/>
        )
      }
      {scrapResult && !isLoading && scrapResult.map((prj, i) =>
        <ProjectItem key={i} prj={prj}/>
        ) 
      }
      {!scrapResult?.length && !isLoading && 
        <Typography textAlign="center" color="white" variant="h6">
          Empty 
        </Typography>
      }
    </Box>
  )
}
