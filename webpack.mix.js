const mix = require('laravel-mix');

mix
  // Dossier public final
  .setPublicPath('dist')
  .setResourceRoot('/projets/TryNotToSeeGame/')

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

  // Webpack
  .webpackConfig({
    devtool: 'source-map',
    output: {
      publicPath: '/projets/TryNotToSeeGame/',
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
