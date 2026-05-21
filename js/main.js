const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');
const entityName = document.getElementById('entity-name');
const entityMap = {
  '1': 'db.Model · CasoClinico',
  '2': 'db.Model · Evolucao',
  '3': 'db.Model · GrupoEstudo',
  '4': 'db.Model · PostComunidade',
  '5': 'Dashboard · view multi-entidade',
  '6': 'db.Model · Usuario · autenticação'
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.screen;
    tabs.forEach(t => t.classList.remove('active'));
    screens.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('screen-' + target).classList.add('active');
    entityName.textContent = entityMap[target];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '1' && e.key <= '6') {
    document.querySelector(`.tab[data-screen="${e.key}"]`).click();
  }
});
