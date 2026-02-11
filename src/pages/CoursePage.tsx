import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const CoursePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('id') || '1';
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1-1', '1-2']);

  const courses = {
    '1': {
      id: 1,
      title: 'Основы подбора персонала',
      description: 'Фундаментальные принципы рекрутмента для начинающих',
      progress: 25,
      level: 'Начальный',
      color: 'from-purple-500 to-purple-700',
      icon: 'Users',
      modules: [
        {
          id: 1,
          title: 'Введение в рекрутмент',
          duration: '45 мин',
          lessons: [
            { id: '1-1', title: 'Роль рекрутера в компании', duration: '15 мин', type: 'article' },
            { id: '1-2', title: 'Процесс подбора: этапы и воронка', duration: '20 мин', type: 'article' },
            { id: '1-3', title: 'Метрики эффективности рекрутмента', duration: '10 мин', type: 'article' },
          ]
        },
        {
          id: 2,
          title: 'Составление вакансии',
          duration: '60 мин',
          lessons: [
            { id: '2-1', title: 'Интервью с заказчиком', duration: '20 мин', type: 'article' },
            { id: '2-2', title: 'Job description: структура и элементы', duration: '15 мин', type: 'article' },
            { id: '2-3', title: 'Практика: создание вакансии', duration: '25 мин', type: 'task' },
          ]
        },
        {
          id: 3,
          title: 'Поиск кандидатов',
          duration: '90 мин',
          lessons: [
            { id: '3-1', title: 'Каналы поиска: обзор', duration: '25 мин', type: 'article' },
            { id: '3-2', title: 'Работа с Job-сайтами', duration: '30 мин', type: 'article' },
            { id: '3-3', title: 'Boolean-поиск в LinkedIn', duration: '20 мин', type: 'article' },
            { id: '3-4', title: 'Практика: поиск по вакансии', duration: '15 мин', type: 'task' },
          ]
        },
        {
          id: 4,
          title: 'Первичный контакт с кандидатом',
          duration: '50 мин',
          lessons: [
            { id: '4-1', title: 'Холодные сообщения: что работает', duration: '20 мин', type: 'article' },
            { id: '4-2', title: 'Телефонный скрининг', duration: '20 мин', type: 'article' },
            { id: '4-3', title: 'Симуляция: первый звонок', duration: '10 мин', type: 'simulation' },
          ]
        },
      ]
    },
    '2': {
      id: 2,
      title: 'Проведение интервью',
      description: 'Техники и методики эффективного собеседования',
      progress: 45,
      level: 'Средний',
      color: 'from-blue-500 to-blue-700',
      icon: 'MessageSquare',
      modules: [
        {
          id: 1,
          title: 'Типы собеседований',
          duration: '40 мин',
          lessons: [
            { id: '1-1', title: 'Структурированное vs неструктурированное', duration: '15 мин', type: 'article' },
            { id: '1-2', title: 'Поведенческие интервью (STAR)', duration: '15 мин', type: 'article' },
            { id: '1-3', title: 'Кейсовые интервью', duration: '10 мин', type: 'article' },
          ]
        },
        {
          id: 2,
          title: 'Подготовка к интервью',
          duration: '55 мин',
          lessons: [
            { id: '2-1', title: 'Анализ резюме кандидата', duration: '20 мин', type: 'article' },
            { id: '2-2', title: 'Составление плана интервью', duration: '15 мин', type: 'article' },
            { id: '2-3', title: 'Практика: чек-лист подготовки', duration: '20 мин', type: 'task' },
          ]
        },
        {
          id: 3,
          title: 'Проведение интервью',
          duration: '70 мин',
          lessons: [
            { id: '3-1', title: 'Создание доверительной атмосферы', duration: '15 мин', type: 'article' },
            { id: '3-2', title: 'Техника активного слушания', duration: '20 мин', type: 'article' },
            { id: '3-3', title: 'Открытые и закрытые вопросы', duration: '15 мин', type: 'article' },
            { id: '3-4', title: 'Симуляция: проведение интервью', duration: '20 мин', type: 'simulation' },
          ]
        },
      ]
    }
  };

  const currentCourse = courses[courseId as keyof typeof courses] || courses['1'];

  const totalLessons = currentCourse.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  const toggleLessonComplete = (lessonId: string) => {
    if (isLessonCompleted(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'article': return 'FileText';
      case 'task': return 'CheckSquare';
      case 'simulation': return 'Play';
      default: return 'File';
    }
  };

  const getLessonTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'Статья';
      case 'task': return 'Задание';
      case 'simulation': return 'Симуляция';
      default: return 'Материал';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${currentCourse.color} rounded-xl flex items-center justify-center`}>
                  <Icon name={currentCourse.icon} className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-lg font-bold">{currentCourse.title}</h1>
                  <p className="text-xs text-muted-foreground">{currentCourse.description}</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
              {currentCourse.level}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>Ваш прогресс</CardTitle>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {progressPercentage}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <CardDescription className="mt-2">
                  Пройдено {completedCount} из {totalLessons} уроков
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Программа курса</h2>
              
              <Accordion type="multiple" defaultValue={['module-1']} className="space-y-4">
                {currentCourse.modules.map((module) => {
                  const moduleLessons = module.lessons;
                  const moduleCompleted = moduleLessons.filter(l => isLessonCompleted(l.id)).length;
                  const moduleProgress = Math.round((moduleCompleted / moduleLessons.length) * 100);

                  return (
                    <AccordionItem
                      key={module.id}
                      value={`module-${module.id}`}
                      className="border-none bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-lg font-bold text-purple-600">{module.id}</span>
                            </div>
                            <div className="text-left">
                              <h3 className="text-lg font-semibold">{module.title}</h3>
                              <div className="flex items-center space-x-3 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {moduleLessons.length} уроков
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center">
                                  <Icon name="Clock" size={14} className="mr-1" />
                                  {module.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-sm font-semibold text-purple-600">
                                {moduleProgress}%
                              </div>
                              <Progress value={moduleProgress} className="h-1.5 w-20" />
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-2 mt-2">
                          {module.lessons.map((lesson, idx) => {
                            const completed = isLessonCompleted(lesson.id);
                            return (
                              <div
                                key={lesson.id}
                                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                  completed
                                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                }`}
                                onClick={() => toggleLessonComplete(lesson.id)}
                              >
                                <div className="flex items-center space-x-4 flex-1">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    completed ? 'bg-green-500' : 'bg-white border-2 border-gray-300'
                                  }`}>
                                    {completed ? (
                                      <Icon name="Check" className="text-white" size={18} />
                                    ) : (
                                      <span className="text-sm text-gray-500">{idx + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <Icon 
                                        name={getLessonIcon(lesson.type)} 
                                        size={16} 
                                        className="text-purple-600"
                                      />
                                      <span className="font-medium">{lesson.title}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                      <Badge variant="outline" className="text-xs">
                                        {getLessonTypeLabel(lesson.type)}
                                      </Badge>
                                      <span className="flex items-center">
                                        <Icon name="Clock" size={12} className="mr-1" />
                                        {lesson.duration}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  className={`ml-4 ${
                                    completed
                                      ? 'bg-green-500 hover:bg-green-600'
                                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonComplete(lesson.id);
                                  }}
                                >
                                  {completed ? (
                                    <>
                                      <Icon name="RotateCcw" size={16} className="mr-2" />
                                      Пересмотреть
                                    </>
                                  ) : (
                                    <>
                                      <Icon name="Play" size={16} className="mr-2" />
                                      Начать
                                    </>
                                  )}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>О курсе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                      <Icon name="BookOpen" className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Модулей</div>
                      <div className="text-lg font-bold">{currentCourse.modules.length}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Уроков</div>
                      <div className="text-lg font-bold">{totalLessons}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                      <Icon name="Award" className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Сертификат</div>
                      <div className="text-sm font-semibold">При 80%+ в тесте</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  {progressPercentage === 100 ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                      size="lg"
                    >
                      <Icon name="FileCheck" size={20} className="mr-2" />
                      Пройти финальный тест
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                      size="lg"
                      disabled
                    >
                      <Icon name="Lock" size={20} className="mr-2" />
                      Завершите все уроки
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/')}
                  >
                    <Icon name="Home" size={18} className="mr-2" />
                    К списку курсов
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Lightbulb" className="mr-2 text-yellow-500" size={24} />
                  Совет
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Проходите уроки последовательно — каждый следующий опирается на знания из предыдущего. Делайте заметки и практикуйте навыки на реальных задачах!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;