import type { Technology } from './helpersTypes.js';

export function listNodeTechnologies(technologies: Technology[]) {
  const items = technologies
    .filter((technology) => technology.poweredByNodejs)
    .map(
      (technology) =>
        `<li class="list-group-item">${technology.name} - ${technology.type}</li>`,
    );

  return `<ul class="list-group">${items.join('')}</ul>`;
}
