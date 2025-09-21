import * as nodemailer from 'nodemailer';

const transportador = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'homologacaodiego@gmail.com', 
    pass: 'ilvxevrlxanyduiq'    
  }
  });


interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// Função para enviar o e-mail
export async function enviarEmail(options: EmailOptions) {
  try {
    const info = await transportador.sendMail({
      from: '"VetCloud" <homologacaodiego@gmail.com>', // Quem está enviando
      to: "diegokenjiyoshida2508@gmail.com",
      subject: options.subject,
      text: options.text,
      html: options.html
    });

    console.log("E-mail enviado: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Erro ao enviar e-mail: ", error);
    throw error;
  }
}