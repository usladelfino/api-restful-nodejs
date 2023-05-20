        // Função para fazer o login
        function login(event) {
            event.preventDefault();
            const login = document.getElementById('login').value;
            const senha = document.getElementById('senha').value;

            // Fazer uma requisição POST para /api/seguranca/login
            fetch('/api/seguranca/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, senha })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('roles', data.roles);

                        document.getElementById('login-form').style.display = 'none';
                        document.getElementById('fornecedores-container').style.display = 'block';

                        fetchFornecedores();
                    } else {
                        alert('Falha no login. Verifique suas credenciais.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao fazer login:', error);
                    alert('Erro ao fazer login. Por favor, tente novamente.');
                });
        }

        // Função para buscar a lista de fornecedores
        function fetchFornecedores() {
            const token = localStorage.getItem('token');

            // Fazer uma requisição GET para /api/fornecedores
            fetch('/api/fornecedores', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const fornecedoresList = document.getElementById('fornecedores-list');
                    const fornecedorDetails = document.getElementById('fornecedor-details');
                    const fornecedorActions = document.getElementById('fornecedor-actions');
                    
                    fornecedoresList.innerHTML = ''; // Limpar a lista de fornecedores
                    console.log(data);
                    if (data.length === 0) {
                        fornecedoresList.innerHTML = '<li>Nenhum fornecedor encontrado.</li>';
                    } else {
                        data.fornecedores.forEach(fornecedor => {
                            const li = document.createElement('li');
                            li.innerText = fornecedor.nome;
                            li.addEventListener('click', () => showFornecedorDetails(fornecedor.id));
                            fornecedoresList.appendChild(li);
                        });
                    }

                    fornecedorDetails.style.display = 'none'; // Ocultar os detalhes do fornecedor
                    fornecedorActions.innerHTML = ''; // Limpar as ações do fornecedor

                    // Verificar se o usuário tem a permissão de incluir fornecedor
                    const roles = localStorage.getItem('roles');
                    if (roles.includes('ADMIN')) {
                        fornecedorActions.innerHTML = '<button onclick="showFornecedorForm()">Incluir Fornecedor</button>';
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar fornecedores:', error);
                    alert('Erro ao buscar fornecedores. Por favor, tente novamente.');
                });
        }

        // Função para exibir os detalhes de um fornecedor
        function showFornecedorDetails(id) {
            const token = localStorage.getItem('token');

            // Fazer uma requisição GET para /api/fornecedores/{id}
            fetch(`/api/fornecedores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const fornecedorDetails = document.getElementById('fornecedor-details');
                    fornecedorDetails.setAttribute('data-id', data.fornecedor.id);
                    fornecedorDetails.innerHTML = `
                                                    <h2>${data.fornecedor.nome}</h2>
                                                    <p><strong>Endereço:</strong> ${data.fornecedor.endereco}</p>
                                                    <p><strong>Cidade:</strong> ${data.fornecedor.cidade}</p>
                                                    <p><strong>UF:</strong> ${data.fornecedor.estado}</p>
                                                    <p><strong>Telefone:</strong> ${data.fornecedor.telefone}</p>
                                                    <p><strong>E-mail:</strong> ${data.fornecedor.email}</p>
                                                `;

                    fornecedorDetails.style.display = 'block'; // Exibir os detalhes do fornecedor

                    const fornecedorActions = document.getElementById('fornecedor-actions');
                    fornecedorActions.innerHTML = '';

                    // Verificar se o usuário tem a permissão de editar fornecedor
                    const roles = localStorage.getItem('roles');
                    if (roles.includes('ADMIN')) {
                        fornecedorActions.innerHTML = `
        <button onclick="showEditFornecedorForm()">Editar</button>
        <button onclick="deleteFornecedor()">Excluir</button>
    `;
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar detalhes do fornecedor:', error);
                    alert('Erro ao buscar detalhes do fornecedor. Por favor, tente novamente.');
                });
        }

        // Função para exibir o formulário de inclusão de fornecedor
        function showFornecedorForm() {
            const fornecedorFormIncluir = document.getElementById('fornecedor-incluir-form');
            fornecedorFormIncluir.style.display = 'block';
            fornecedorFormIncluir.reset();

            const fornecedorFormEditar = document.getElementById('fornecedor-editar-form');
            fornecedorFormEditar.style.display = 'none';
        }


        // Função para exibir o formulário de edição de fornecedor
        function showEditFornecedorForm() {
            const id = document.getElementById('fornecedor-details').getAttribute('data-id');
            const fornecedorFormIncluir = document.getElementById('fornecedor-incluir-form');
            fornecedorFormIncluir.style.display = 'none';

            const fornecedorFormEditar = document.getElementById('fornecedor-editar-form');
            fornecedorFormEditar.style.display = 'block';

            // Fazer uma requisição GET para /api/fornecedores/{id}
            const token = localStorage.getItem('token');
            fetch(`/api/fornecedores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    fornecedorFormEditar.elements['nome-editar'].value = data.fornecedor.nome;
                    fornecedorFormEditar.elements['endereco-editar'].value = data.fornecedor.endereco;
                    fornecedorFormEditar.elements['cidade-editar'].value = data.fornecedor.cidade;
                    fornecedorFormEditar.elements['estado-editar'].value = data.fornecedor.estado;
                    fornecedorFormEditar.elements['telefone-editar'].value = data.fornecedor.telefone;
                    fornecedorFormEditar.elements['email-editar'].value = data.fornecedor.email;
                })
                .catch(error => {
                    console.error('Erro ao buscar detalhes do fornecedor:', error);
                    alert('Erro ao buscar detalhes do fornecedor. Por favor, tente novamente.');
                });
        }

        // Função para incluir um fornecedor
        function incluirFornecedor(event) {
            event.preventDefault();

            const token = localStorage.getItem('token');
            const fornecedorForm = document.getElementById('fornecedor-incluir-form');
            const fornecedorFormTitle = document.getElementById('fornecedor-incluir-form-title');
            
            const data = {
                nome: fornecedorForm.elements['nome'].value,
                endereco: fornecedorForm.elements['endereco'].value,
                cidade: fornecedorForm.elements['cidade'].value,
                estado: fornecedorForm.elements['estado'].value,
                telefone: fornecedorForm.elements['telefone'].value,
                email: fornecedorForm.elements['email'].value
            };

            fetch('/api/fornecedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        fornecedorForm.style.display = 'none';
                        fornecedorForm.reset();
                        fetchFornecedores();
                        alert('Fornecedor salvo com sucesso!');
                    } else {
                        throw new Error('Erro ao salvar fornecedor.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao salvar fornecedor:', error);
                    alert('Erro ao salvar fornecedor. Por favor, tente novamente.');
                });
        }

        function editarFornecedor(event) {
            event.preventDefault();

            const token = localStorage.getItem('token');
            const id = document.getElementById('fornecedor-details').getAttribute('data-id');
            const fornecedorForm = document.getElementById('fornecedor-editar-form');
            const fornecedorFormTitle = document.getElementById('fornecedor-editar-form-title');
            
            const data = {
                nome: fornecedorForm.elements['nome-editar'].value,
                endereco: fornecedorForm.elements['endereco-editar'].value,
                cidade: fornecedorForm.elements['cidade-editar'].value,
                estado: fornecedorForm.elements['estado-editar'].value,
                telefone: fornecedorForm.elements['telefone-editar'].value,
                email: fornecedorForm.elements['email-editar'].value
            };

            fetch(`/api/fornecedores/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        fornecedorForm.style.display = 'none';
                        fornecedorForm.reset();
                        fetchFornecedores();
                        alert('Fornecedor salvo com sucesso!');
                    } else {
                        throw new Error('Erro ao salvar fornecedor.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao salvar fornecedor:', error);
                    alert('Erro ao salvar fornecedor. Por favor, tente novamente.');
                });
        }

        // Função para excluir um fornecedor
        function deleteFornecedor() {
            if (confirm('Deseja excluir este fornecedor?')) {
                const id = document.getElementById('fornecedor-details').getAttribute('data-id');
                const token = localStorage.getItem('token');

                fetch(`/api/fornecedores/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            fetchFornecedores();
                            alert('Fornecedor excluído com sucesso!');
                        } else {
                            throw new Error('Erro ao excluir fornecedor.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao excluir fornecedor:', error);
                        alert('Erro ao excluir fornecedor. Por favor, tente novamente.');
                    });
            }
        }

        // Event listener para o formulário de login
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', login);

        // Event listener para o formulário de inclusão de fornecedor
        const fornecedorIncluirForm = document.getElementById('fornecedor-incluir-form');
        fornecedorIncluirForm.addEventListener('submit', incluirFornecedor);

        // Event listener para o formulário de edição de fornecedor
        const fornecedorEditarForm = document.getElementById('fornecedor-editar-form');
        fornecedorEditarForm.addEventListener('submit', editarFornecedor);