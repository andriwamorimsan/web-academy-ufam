import type { Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const loremIpsum = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function index(req: Request, res: Response) {
  res.render('main/index', {
    title: 'Express + TypeScript',
  });
}

function sobre(req: Request, res: Response) {
  res.render('main/sobre', {
    title: 'Sobre',
  });
}

function bemvindo(req: Request, res: Response) {
  res.render('main/bemvindo', {
    title: 'Bem-vindo',
    nome: req.params.nome,
  });
}

function lorem(req: Request, res: Response) {
  const paragraphs = Number(req.params.paragraphs ?? req.query.paragraphs ?? 1);
  const amount = Number.isInteger(paragraphs) && paragraphs > 0 ? paragraphs : 1;

  res.render('main/lorem', {
    title: 'Lorem Ipsum',
    paragraphs: loremIpsum.generateParagraphs(amount),
  });
}

function hb1(req: Request, res: Response) {
  res.render('hb/hb1', {
    title: 'HB1',
    mensagem: 'Ola, voce esta aprendendo Express + Handlebars!',
  });
}

function hb2(req: Request, res: Response) {
  res.render('hb/hb2', {
    title: 'HB2',
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  });
}

function hb3(req: Request, res: Response) {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horacio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];

  res.render('hb/hb3', { title: 'HB3', profes });
}

function hb4(req: Request, res: Response) {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb/hb4', { title: 'HB4', technologies });
}

export default { index, sobre, bemvindo, lorem, hb1, hb2, hb3, hb4 };
