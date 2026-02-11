import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: 'Основы подбора персонала',
      description: 'Фундаментальные принципы рекрутмента для начинающих',
      progress: 0,
      modules: 8,
      duration: '6 недель',
      level: 'Начальный',
      color: 'from-purple-500 to-purple-700',
      icon: 'Users'
    },
    {
      id: 2,
      title: 'Проведение интервью',
      description: 'Техники и методики эффективного собеседования',
      progress: 45,
      modules: 10,
      duration: '4 недели',
      level: 'Средний',
      color: 'from-blue-500 to-blue-700',
      icon: 'MessageSquare'
    },
    {
      id: 3,
      title: 'Поиск и привлечение талантов',
      description: 'Современные методы поиска кандидатов в digital',
      progress: 100,
      modules: 12,
      duration: '8 недель',
      level: 'Продвинутый',
      color: 'from-orange-500 to-orange-700',
      icon: 'Search'
    },
    {
      id: 4,
      title: 'HR-аналитика и метрики',
      description: 'Работа с данными для оптимизации процессов подбора',
      progress: 0,
      modules: 6,
      duration: '5 недель',
      level: 'Средний',
      color: 'from-green-500 to-green-700',
      icon: 'BarChart3'
    },
    {
      id: 5,
      title: 'Работа с HR-системами',
      description: 'ATS, CRM и автоматизация процессов рекрутмента',
      progress: 20,
      modules: 9,
      duration: '5 недель',
      level: 'Средний',
      color: 'from-indigo-500 to-indigo-700',
      icon: 'Laptop'
    },
    {
      id: 6,
      title: 'Employer Branding',
      description: 'Построение бренда работодателя и продвижение вакансий',
      progress: 0,
      modules: 7,
      duration: '4 недели',
      level: 'Продвинутый',
      color: 'from-pink-500 to-pink-700',
      icon: 'Sparkles'
    },
    {
      id: 7,
      title: 'Массовый подбор',
      description: 'Стратегии закрытия большого количества вакансий',
      progress: 0,
      modules: 8,
      duration: '5 недель',
      level: 'Средний',
      color: 'from-cyan-500 to-cyan-700',
      icon: 'UserPlus'
    },
    {
      id: 8,
      title: 'IT-рекрутмент',
      description: 'Особенности подбора технических специалистов',
      progress: 0,
      modules: 11,
      duration: '7 недель',
      level: 'Продвинутый',
      color: 'from-emerald-500 to-emerald-700',
      icon: 'Code'
    },
    {
      id: 9,
      title: 'Трудовое законодательство РФ',
      description: 'Правовые основы работы с персоналом',
      progress: 0,
      modules: 10,
      duration: '6 недель',
      level: 'Начальный',
      color: 'from-amber-500 to-amber-700',
      icon: 'Scale'
    },
    {
      id: 10,
      title: 'Адаптация персонала',
      description: 'Онбординг и интеграция новых сотрудников',
      progress: 0,
      modules: 6,
      duration: '4 недели',
      level: 'Начальный',
      color: 'from-rose-500 to-rose-700',
      icon: 'HeartHandshake'
    },
    {
      id: 11,
      title: 'Развитие и мотивация персонала',
      description: 'Системы оценки, грейдинг и управление талантами',
      progress: 0,
      modules: 9,
      duration: '6 недель',
      level: 'Средний',
      color: 'from-violet-500 to-violet-700',
      icon: 'TrendingUp'
    },
    {
      id: 12,
      title: 'Удаленный найм',
      description: 'Особенности подбора и управления распределенными командами',
      progress: 0,
      modules: 7,
      duration: '4 недели',
      level: 'Средний',
      color: 'from-teal-500 to-teal-700',
      icon: 'Globe'
    }
  ];

  const simulationCases = [
    {
      id: 1,
      title: 'Отказ кандидата на финальной стадии',
      description: 'Кандидат отказывается от оффера. Ваши действия?',
      difficulty: 'Средняя',
      timeLimit: '15 мин',
      icon: 'UserX',
      category: 'Работа с кандидатами'
    },
    {
      id: 2,
      title: 'Конфликт с заказчиком',
      description: 'Руководитель недоволен предложенными кандидатами',
      difficulty: 'Высокая',
      timeLimit: '20 мин',
      icon: 'AlertTriangle',
      category: 'Взаимодействие с заказчиками'
    },
    {
      id: 3,
      title: 'Срочная вакансия',
      description: 'Нужно закрыть позицию за 3 дня. План действий?',
      difficulty: 'Высокая',
      timeLimit: '25 мин',
      icon: 'Clock',
      category: 'Тайм-менеджмент'
    },
    {
      id: 4,
      title: 'Кандидат завышает ожидания по ЗП',
      description: 'Идеальный кандидат, но его запрос на 40% выше бюджета',
      difficulty: 'Средняя',
      timeLimit: '15 мин',
      icon: 'DollarSign',
      category: 'Переговоры'
    },
    {
      id: 5,
      title: 'Негативный отзыв на работных сайтах',
      description: 'Кандидат прочитал плохие отзывы о компании и сомневается',
      difficulty: 'Средняя',
      timeLimit: '15 мин',
      icon: 'MessageCircle',
      category: 'Работа с возражениями'
    },
    {
      id: 6,
      title: 'Массовое увольнение в отделе',
      description: 'Нужно срочно закрыть 10 позиций после ухода команды',
      difficulty: 'Высокая',
      timeLimit: '30 мин',
      icon: 'Users',
      category: 'Кризисное управление'
    },
    {
      id: 7,
      title: 'Кандидат не выходит на связь',
      description: 'После успешного интервью кандидат пропал. Что делать?',
      difficulty: 'Низкая',
      timeLimit: '10 мин',
      icon: 'PhoneOff',
      category: 'Работа с кандидатами'
    },
    {
      id: 8,
      title: 'Дискриминационный запрос заказчика',
      description: 'Руководитель просит подобрать только мужчин до 35 лет',
      difficulty: 'Высокая',
      timeLimit: '20 мин',
      icon: 'Shield',
      category: 'Этика и законодательство'
    },
    {
      id: 9,
      title: 'Переманивание от конкурента',
      description: 'Ваш лучший кандидат получил оффер от прямого конкурента',
      difficulty: 'Высокая',
      timeLimit: '20 мин',
      icon: 'Target',
      category: 'Удержание талантов'
    },
    {
      id: 10,
      title: 'Неадекватные требования к позиции',
      description: 'Заказчик хочет Senior специалиста за Junior зарплату',
      difficulty: 'Средняя',
      timeLimit: '15 мин',
      icon: 'TrendingDown',
      category: 'Консультирование заказчиков'
    },
    {
      id: 11,
      title: 'Фейковое резюме',
      description: 'Вы заподозрили кандидата в искажении опыта работы',
      difficulty: 'Средняя',
      timeLimit: '15 мин',
      icon: 'FileWarning',
      category: 'Проверка информации'
    },
    {
      id: 12,
      title: 'Токсичный сотрудник на испытательном',
      description: 'Новый сотрудник конфликтует с командой в первую неделю',
      difficulty: 'Высокая',
      timeLimit: '25 мин',
      icon: 'Flame',
      category: 'Адаптация и онбординг'
    }
  ];

  const userStats = {
    completedCourses: 1,
    inProgress: 1,
    certificates: 1,
    totalPoints: 850,
    rank: 'Специалист',
    nextRank: 'Эксперт',
    pointsToNext: 150
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  HR Academy
                </h1>
                <p className="text-xs text-muted-foreground">Обучение рекрутеров и HR</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={20} />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  АИ
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 border-none shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white overflow-hidden">
            <CardHeader className="relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <CardTitle className="text-3xl font-bold relative z-10">
                Добро пожаловать в HR Academy! 👋
              </CardTitle>
              <CardDescription className="text-purple-100 text-lg relative z-10">
                Развивайте навыки рекрутмента через практику и симуляции реальных кейсов
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  <Icon name="Play" size={20} className="mr-2" />
                  Продолжить обучение
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Каталог курсов
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ваш прогресс</span>
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                  {userStats.rank}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">До ранга "{userStats.nextRank}"</span>
                  <span className="font-semibold">{userStats.totalPoints} / 1000</span>
                </div>
                <Progress value={(userStats.totalPoints / 1000) * 100} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userStats.completedCourses}</div>
                  <div className="text-xs text-muted-foreground">Пройдено</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userStats.inProgress}</div>
                  <div className="text-xs text-muted-foreground">В процессе</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{userStats.certificates}</div>
                  <div className="text-xs text-muted-foreground">Сертификаты</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userStats.totalPoints}</div>
                  <div className="text-xs text-muted-foreground">Баллов</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-md p-1 h-12">
            <TabsTrigger value="courses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Курсы
            </TabsTrigger>
            <TabsTrigger value="cases" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="Briefcase" size={18} className="mr-2" />
              Кейсы и симуляции
            </TabsTrigger>
            <TabsTrigger value="tests" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="FileText" size={18} className="mr-2" />
              Тесты
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="Award" size={18} className="mr-2" />
              Сертификаты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Доступные курсы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer"
                  >
                    <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon name={course.icon} className="text-white" size={24} />
                        </div>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="BookOpen" size={16} />
                          <span>{course.modules} модулей</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={16} />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      {course.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                      <Button
                        className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 transition-opacity`}
                      >
                        {course.progress === 0 ? 'Начать курс' : course.progress === 100 ? 'Пройти тест' : 'Продолжить'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Практические кейсы и симуляции</h2>
              <p className="text-muted-foreground mb-6">
                Отработайте навыки на реальных ситуациях из практики рекрутеров
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {simulationCases.map((simCase) => (
                  <Card
                    key={simCase.id}
                    className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  >
                    <CardHeader>
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon name={simCase.icon} className="text-purple-600" size={28} />
                      </div>
                      <CardTitle className="text-lg">{simCase.title}</CardTitle>
                      <CardDescription>{simCase.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={simCase.difficulty === 'Высокая' ? 'destructive' : 'secondary'}
                          >
                            {simCase.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Icon name="Timer" size={16} />
                          <span>{simCase.timeLimit}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                        <Icon name="Play" size={18} className="mr-2" />
                        Начать симуляцию
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Тестирование знаний</h2>
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Финальный тест: Основы подбора персонала</span>
                      <Badge className="bg-green-500">Доступен</Badge>
                    </CardTitle>
                    <CardDescription>
                      Проверьте свои знания по пройденному курсу. Для получения сертификата необходимо набрать минимум 80%.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">30</div>
                        <div className="text-xs text-muted-foreground">Вопросов</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">45</div>
                        <div className="text-xs text-muted-foreground">Минут</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">80%</div>
                        <div className="text-xs text-muted-foreground">Проходной балл</div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90" size="lg">
                      <Icon name="FileCheck" size={20} className="mr-2" />
                      Начать тестирование
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg opacity-50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Финальный тест: Проведение интервью</span>
                      <Badge variant="secondary">Недоступен</Badge>
                    </CardTitle>
                    <CardDescription>
                      Завершите курс "Проведение интервью", чтобы открыть доступ к тесту
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс курса</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Мои сертификаты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="Award" className="text-white" size={32} />
                      </div>
                      <Badge className="bg-green-500">Получен</Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">Основы подбора персонала</CardTitle>
                    <CardDescription>Выдан 15 января 2026</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Итоговая оценка</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        92%
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500">
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="Share2" size={18} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[300px]">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Lock" className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Пройдите больше курсов</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Завершите обучение и получите новые сертификаты
                    </p>
                    <Button variant="outline">
                      К курсам
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 HR Academy. Платформа обучения рекрутеров и HR-специалистов</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;