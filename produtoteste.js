const Produto = require('./models/Produto');

async function createCursoDeIngles() {
    try {
        const cursoDeIngles = await Produto.create({
            nome: 'Curso de Inglês',
            descricao: 'Aprenda inglês com nosso curso completo.',
            valor: 100.00 // Valor mensal em reais
        });

        console.log('Curso de inglês criado:', cursoDeIngles.toJSON());
    } catch (error) {
        console.error('Erro ao criar curso de inglês:', error);
    }
}

createCursoDeIngles();
