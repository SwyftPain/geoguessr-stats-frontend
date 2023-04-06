enum Active {
  home = 'home',
  register = 'register',
  login = 'login',
  weekly = 'weekly',
  total = 'total'
}

type ActivePage = keyof typeof Active

export type { ActivePage }
