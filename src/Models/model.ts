export interface IProjectData {
  title: string
  describe?: string
  date?: string
  cost?: string
  term?: string
  views?: string
}

export interface IProject extends IProjectData {
  url: string
  from: string
}

export interface IScrapResultItem {
  projects: IProject[]
  projectsCount: number
  from: string
}

export interface IOptions {
  card: string
  url: string
  info: IProjectData,
  pagination: {
    type: 'query' | 'url',
    nextPage?: string
  },
  totalCount?: {
    total: string,
    perPage: number,
  }
}

export interface IScarpOption {
  baseUrl: string
  url: string
  queryParams: string
  options: IOptions
}

export type IScrapResultType = IScrapResultItem[]
