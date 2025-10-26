const mix = require('laravel-mix');

mix
  // Dossier public final
  .setPublicPath('dist')
  .setResourceRoot('./')

  // Copie les fichiers nécessaires
  .copy('src/index.html', 'dist/index.html')
  .copyDirectory('src/assets', 'dist/assets')
  .copyDirectory('src/pages', 'dist/pages')

  // JS principal
  .js('src/scripts/main.js', 'dist/scripts/')

  // SCSS
  .sass('src/styles/main.scss', 'dist/styles/', {
    sassOptions: { outputStyle: 'expanded' }
  })

  // Options CSS
  .options({
    processCssUrls: false,
    autoprefixer: { options: { grid: true } }
  })

  // Webpack — la clé ici 👇
  .webpackConfig({
    devtool: 'source-map',
    output: {
      publicPath: './',
      chunkFilename: 'scripts/[name].js'
    },
    resolve: {
      modules: ['src/scripts', 'node_modules']
    }
  })

  // Optionnel : serveur local
  .browserSync({
    proxy: false,
    server: 'dist',
    files: ['dist/**/*']
  })

  .disableSuccessNotifications();
