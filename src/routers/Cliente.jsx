import {useState} from "react";
import {useForm} from 'react-hhok-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup';

const schema = yup.object({
    nome: yup.string().required("Campo Nome Obrigatório"),
    email: yup.string().email("Digite um email válido").required("Campo Email Obrigatório"),
    cpf: yup.string().min(11, "CPF deve conter pelo menos 11 dígitos").required("Campo CPF Obrigatório"),

})
.required();

function Cliente(){
    const {register,handleSubmit,formState:{erros}, setValue, setFocus,}
    =  useForm({ resolver:yupResolver(schema),
    
})}

const [listaclientes, setListaClientes] = useState([]);

function inserirCliente(cliente){
    setListaClientes ([...listaclientes, cliente]);
}

function buscarCep(e){
    const cep = e.target.value.replace(/\D/g,'');
    fetch(`viacep.com.br/ws/${cep}/json`)
    .then((res)=>res.json())
    .then((data)=>{
        setValue('Rua', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
        setFocus('numero')
    })
}


return (
    <>
    <form onSubmit={handleSubmit(inserirCliente)}>
        <fieldset>
            <legend>Dados Pessoais:</legend>

            <label>Nome:
            <input type="text" {...register('nome')}/>
            <span>{errors.nome?.message}</span>
            </label>

            <label>Email:
            <input type="text" {...register('email')}/>
            <span>{errors.email?.message}</span>
            </label>

            <label>CPF:
            <input type="text" {...register('cpf')}/>
            <span>{errors.cpf?.message}</span>
            </label>
        </fieldset>

        <fieldset>
            <legend>Endereço:</legend>
            <label>
                CEP:
                <input type="text" {...register('cep')} onBlur={buscarCep}/>
            </label>

            <label>
                Rua:
                <input type="text" {...register('rua')}/>
            </label>

            <label>
                Núero:
                <input type="text" {...register('numero')}/>
            </label>
            
            <label>
                Bairro:
                <input type="text" {...register('bairro')}/>
            </label>

            <label>
                Cidade:
                <input type="text" {...register('cidade')}/>
            </label>

            <label>
                Estado:
                <input type="text" {...register('estado')}/>
            </label>
        </fieldset>
    </form>
    </>
)

export default Cliente