const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/database');

// Carregar modelos
const Admin = require('./models/Admin');
const Cliente = require('./models/Cliente');
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const Pagamento = require('./models/Pagamento');

// Definir associações
const models = { Admin, Cliente, Usuario, Produto, Pagamento };
Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

const app = express();

// Configuração do Handlebars como motor de visualização
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware para processar dados de formulários e JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Configuração da sessão
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

// Conectar ao banco de dados
sequelize.sync()
    .then(() => console.log('Banco de dados conectado...'))
    .catch(err => console.log('Erro: ' + err));

// Importar rotas
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// Usar rotas
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes); // Adiciona as rotas do admin
app.use('/user', userRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// Rota para acessar a página de login do admin
app.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

// Rota para acessar a página de login do usuário
app.get('/user/login', (req, res) => {
    res.render('user/login');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
