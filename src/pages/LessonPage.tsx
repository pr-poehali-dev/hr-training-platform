import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: string;
  content?: string;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  level: string;
  color: string;
  icon: string;
  modules: Module[];
}

const LessonPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || '1';
  const lessonId = searchParams.get('lessonId') || '1-1';
  
  const [isCompleted, setIsCompleted] = useState(() => {
    const saved = localStorage.getItem(`course-${courseId}-completed`);
    const completedLessons = saved ? JSON.parse(saved) : [];
    return completedLessons.includes(lessonId);
  });

  useEffect(() => {
    const saved = localStorage.getItem(`course-${courseId}-completed`);
    const completedLessons = saved ? JSON.parse(saved) : [];
    setIsCompleted(completedLessons.includes(lessonId));
  }, [lessonId, courseId]);

  const toggleCompletion = () => {
    const saved = localStorage.getItem(`course-${courseId}-completed`);
    const completedLessons = saved ? JSON.parse(saved) : [];
    
    if (completedLessons.includes(lessonId)) {
      const updated = completedLessons.filter((id: string) => id !== lessonId);
      localStorage.setItem(`course-${courseId}-completed`, JSON.stringify(updated));
      setIsCompleted(false);
    } else {
      const updated = [...completedLessons, lessonId];
      localStorage.setItem(`course-${courseId}-completed`, JSON.stringify(updated));
      setIsCompleted(true);
    }
  };

  const courses: Record<string, Course> = {
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
            { 
              id: '1-1', 
              title: 'Роль рекрутера в компании', 
              duration: '15 мин', 
              type: 'article',
              content: 'Рекрутер — ключевая фигура в любой компании, отвечающая за привлечение талантов. Основные функции:\n\n• Анализ потребностей бизнеса и перевод их в требования к кандидатам\n• Построение воронки подбора от первого контакта до оффера\n• Работа с hiring-менеджерами и командой HR\n• Формирование employer brand и опыта кандидата\n\nВаша задача — не просто закрыть вакансию, а найти человека, который будет успешен в компании долгосрочно. Это требует понимания бизнес-целей, корпоративной культуры и специфики роли.'
            },
            { 
              id: '1-2', 
              title: 'Процесс подбора: этапы и воронка', 
              duration: '20 мин', 
              type: 'article',
              content: 'Классическая воронка рекрутмента включает 6 этапов:\n\n1. **Анализ потребности** — интервью с заказчиком, определение требований\n2. **Поиск кандидатов** — sourcing через различные каналы\n3. **Скрининг** — первичная оценка по телефону или email\n4. **Интервью** — структурированное собеседование с командой\n5. **Оценка** — проверка референсов, тестовые задания\n6. **Оффер** — согласование условий и закрытие кандидата\n\nНа каждом этапе происходит отсев. Важно отслеживать конверсию между этапами и понимать, где теряются лучшие кандидаты.'
            },
            { 
              id: '1-3', 
              title: 'Метрики эффективности рекрутмента', 
              duration: '10 мин', 
              type: 'article',
              content: 'Ключевые метрики для оценки работы рекрутера:\n\n• **Time to Fill** — время от открытия вакансии до принятия оффера (средняя норма: 30-45 дней)\n• **Time to Hire** — время от первого контакта с кандидатом до оффера (норма: 14-21 день)\n• **Quality of Hire** — процент новичков, прошедших испытательный срок (целевой показатель: 90%+)\n• **Offer Acceptance Rate** — процент принятых офферов (норма: 85%+)\n• **Source of Hire** — эффективность каналов поиска\n• **Cost per Hire** — затраты на закрытие одной позиции\n\nОтслеживание метрик помогает оптимизировать процесс и аргументировать ценность HR-функции перед бизнесом.'
            },
          ]
        },
      ]
    },
  };

  const currentCourse = courses[courseId as keyof typeof courses] || courses['1'];
  
  const findLesson = (): { lesson: Lesson | null; module: Module | null } => {
    for (const module of currentCourse.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return { lesson, module };
      }
    }
    return { lesson: null, module: null };
  };

  const { lesson, module } = findLesson();

  const findNextLesson = (): string | null => {
    let foundCurrent = false;
    for (const mod of currentCourse.modules) {
      for (const les of mod.lessons) {
        if (foundCurrent) {
          return `?courseId=${courseId}&lessonId=${les.id}`;
        }
        if (les.id === lessonId) {
          foundCurrent = true;
        }
      }
    }
    return null;
  };

  const nextLessonUrl = findNextLesson();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!lesson || !module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Урок не найден</h2>
          <Button onClick={() => navigate('/courses')} className="mt-4">
            Вернуться к курсам
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/course?id=${courseId}`)}
          className="mb-6 hover:bg-white/50"
        >
          <Icon name="ArrowLeft" className="mr-2" size={20} />
          Назад к курсу
        </Button>

        <Card className="border-0 shadow-xl overflow-hidden mb-6">
          <div className={`h-2 bg-gradient-to-r ${currentCourse.color}`} />
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${currentCourse.color} rounded-xl flex items-center justify-center`}>
                  <Icon name={getLessonIcon(lesson.type)} className="text-white" size={24} />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    {module.title}
                  </Badge>
                  <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>{lesson.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{getLessonTypeLabel(lesson.type)}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none pt-6">
            <div className="whitespace-pre-line text-base leading-relaxed text-slate-700">
              {lesson.content || 'Контент урока загружается...'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant={isCompleted ? "secondary" : "default"}
                size="lg"
                onClick={toggleCompletion}
                className={isCompleted ? "bg-green-500 hover:bg-green-600 text-white" : ""}
              >
                {isCompleted ? (
                  <>
                    <Icon name="CheckCircle2" className="mr-2" size={20} />
                    Урок завершён
                  </>
                ) : (
                  <>
                    <Icon name="Circle" className="mr-2" size={20} />
                    Отметить как пройденный
                  </>
                )}
              </Button>
            </div>
            {nextLessonUrl ? (
              <Button
                size="lg"
                className={`bg-gradient-to-r ${currentCourse.color}`}
                onClick={() => navigate(`/lesson${nextLessonUrl}`)}
              >
                Следующий урок
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600"
                onClick={() => navigate(`/course?id=${courseId}`)}
              >
                <Icon name="Award" className="mr-2" size={20} />
                Завершить курс
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LessonPage;