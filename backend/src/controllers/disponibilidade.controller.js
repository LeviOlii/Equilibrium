const Disponibilidade = require("../models/disponibilidade.model");

exports.criarDisponibilidade = async (req, res) => {
    const { profissional_id, dataHora, disponivel } = req.body;
  
    try {
      const disponibilidade = await Disponibilidade.criarDisponibilidade({ 
        profissional_id, 
        dataHora, 
        disponivel 
      });
      
      return res.status(201).json(disponibilidade);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  exports.criarMultiplasDisponibilidades = async (req, res) => {
    const { disponibilidades } = req.body;
    console.log(req.body);
    
    try {
      // Validação básica
      if (!Array.isArray(disponibilidades)) {
        return res.status(400).json({ 
          error: "O corpo da requisição deve conter um array de disponibilidades" 
        });
      }
  
      if (disponibilidades.length === 0) {
        return res.status(400).json({ 
          error: "O array de disponibilidades não pode estar vazio" 
        });
      }
  
      const createdAvailabilities = await Disponibilidade.criarMultiplasDisponibilidades(disponibilidades);
      
      return res.status(201).json(createdAvailabilities);
    } catch (error) {
      console.error("Erro ao criar múltiplas disponibilidades:", error);
      
      // Tratamento de erros específicos
      if (error.message.includes("Profissional não encontrado")) {
        return res.status(404).json({ error: error.message });
      }
      
      return res.status(500).json({ 
        error: error.message || "Erro interno do servidor" 
      });
    }
  };

exports.atualizarDisponibilidade = async (req, res) => {
    const { id } = req.params; // Obtém o ID da URL
    const { dataHora, disponivel } = req.body; // profissional_id não será alterado

    try {
        const disponibilidadeAtualizada = await Disponibilidade.atualizarDisponibilidade(id, { dataHora, disponivel });

        return res.status(200).json(disponibilidadeAtualizada);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.buscarDisponibilidadesPorIdProfissional = async (req, res) => {
    const { id } = req.params;

    try {
        const disponibilidade = await Disponibilidade.buscarDisponibilidadesPorIdProfissional(id);

        if (!disponibilidade) {
            return res.status(404).json({ error: 'Disponibilidade não encontrada' });
        }

        return res.status(200).json(disponibilidade);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.buscarDisponibilidadesPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const disponibilidade = await Disponibilidade.buscarDisponibilidadesPorId(id);

        if (!disponibilidade) {
            return res.status(404).json({ error: 'Disponibilidade não encontrada' });
        }

        return res.status(200).json(disponibilidade);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deletarDisponibilidade = async (req, res) => {
    const { id } = req.params;

    try {
        await Disponibilidade.deletarDisponibilidade(Number(id));
        return res.status(204).send(); // Responde sem corpo, indicando que foi deletado
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
