import nodemailer from 'nodemailer'

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


async function enviarCodigoVerificacao(userEmail) {
    const code = generateCode();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seu-email@gmail.com',
            pass: 'sua-senha-de-aplicativo'
        }
    });

    const mailOptions = {
        from: '"Sistema de Segurança" <seu-email@gmail.com>',
        to: userEmail,
        subject: 'Seu código de verificação',
        text: `Olá! Seu código de verificação de 6 dígitos é: ${code}. Ele expira em breve.`,
        html: `<p>Olá!</p><h3>Seu código de verificação é: <strong>${code}</strong></h3><p>Ele expira em breve.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Código enviado com sucesso para ${userEmail}!`);
        
        return codigo; 
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
    }
}

enviarCodigoVerificacao('cliente@email.com');