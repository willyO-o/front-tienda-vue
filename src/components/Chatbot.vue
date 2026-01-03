<template>
    <div class="chatbot position-fixed bottom-0 end-0 m-3" style="z-index: 1050;">

        <!-- Ventana del Chat -->
        <div v-show="isOpen" class="card shadow-lg mb-2" style="width: 320px; height: 450px;">
            <!-- Header -->
            <div class="card-header bg-gradient-info text-white d-flex justify-content-between align-items-center py-2">
                <div class="d-flex align-items-center">
                    <div
                        class="avatar avatar-sm bg-white rounded-circle me-2 d-flex justify-content-center align-items-center">
                        <i class="fas fa-robot text-info"></i>
                    </div>
                    <div>
                        <h6 class="mb-0 text-white">Asistente Virtual</h6>
                        <small class="text-white-50">En línea</small>
                    </div>
                </div>
                <button class="btn btn-link text-white p-0" @click="toggleChat">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Body - Mensajes -->
            <div class="card-body p-3 overflow-auto" ref="chatBody" style="height: 320px;">
                <!-- Mensaje del Bot -->
                <div v-for="(message, index) in messages" :key="index" class="mb-3">
                    <div v-if="message.sender === 'bot'" class="d-flex">
                        <div
                            class="avatar avatar-xs bg-info rounded-circle me-2 d-flex justify-content-center align-items-center flex-shrink-0">
                            <i class="fas fa-robot text-white" style="font-size: 10px;"></i>
                        </div>
                        <div class="bg-light rounded-3 p-2 message-bubble-bot">
                            <p class="mb-0 text-sm text-dark">{{ message.text }}</p>
                        </div>
                    </div>
                    <!-- Mensaje del Usuario -->
                    <div v-else class="d-flex justify-content-end">
                        <div class="bg-gradient-info rounded-3 p-2 message-bubble-user">
                            <p class="mb-0 text-sm text-white">{{ message.text }}</p>
                        </div>
                    </div>
                </div>

                <!-- Indicador de escritura -->
                <div v-if="isTyping" class="d-flex mb-3">
                    <div
                        class="avatar avatar-xs bg-info rounded-circle me-2 d-flex justify-content-center align-items-center flex-shrink-0">
                        <i class="fas fa-robot text-white" style="font-size: 10px;"></i>
                    </div>
                    <div class="bg-light rounded-3 p-2">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer - Input -->
            <div class="card-footer bg-white border-top p-2">
                <form @submit.prevent="sendMessage" class="d-flex align-items-center">
                    <input v-model="userInput" type="text"
                        class="form-control form-control-sm border-0 bg-light rounded-pill me-2"
                        placeholder="Escribe un mensaje...">
                    <button type="submit"
                        class="btn btn-info btn-sm rounded-circle d-flex justify-content-center align-items-center"
                        style="width: 36px; height: 36px;" :disabled="!userInput.trim() || isTyping">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>

        <!-- Botón flotante -->
        <div class="text-end">
            <button class="btn btn-info rounded-circle shadow-lg d-flex justify-content-center align-items-center"
                style="width: 56px; height: 56px;" @click="toggleChat">
                <i :class="isOpen ? 'fas fa-times' : 'fas fa-comment-dots'" class="fa-lg"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

const isOpen = ref(false);
const isTyping = ref(false);
const userInput = ref('');
const chatBody = ref(null);
const STORE_CONTEXT = ref('Cargando contexto...');

const messages = ref([
    { sender: 'bot', text: '¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
]);

// Cargar el contexto al montar el componente
onMounted(() => {
    fetch('/assets/files/contexto.txt')
        .then(r => r.text())
        .then(t => STORE_CONTEXT.value = t)
        .catch(err => {
            console.error('Error al cargar el contexto:', err);
            STORE_CONTEXT.value = 'Contexto no disponible';
        });
});

const toggleChat = () => {
    isOpen.value = !isOpen.value;
};

const scrollToBottom = async () => {
    await nextTick();
    if (chatBody.value) {
        chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
};

const sendMessage = async () => {
    if (!userInput.value.trim()) return;

    const question = userInput.value;
    messages.value.push({ sender: 'user', text: question });
    userInput.value = '';

    await scrollToBottom();

    isTyping.value = true;
    await scrollToBottom();

    const prompt = `
Eres un asistente de soporte de una tienda en línea.
Responde solo usando el contexto proporcionado.
Si la pregunta no está relacionada o no aparece en el contexto, responde:
"Solo puedo ayudarte con información sobre la tienda."
Si la pregunta contiene un saludo, responde con un saludo apropiado.

Contexto:
${STORE_CONTEXT.value}

Pregunta: ${question}
Respuesta:
`;

    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: prompt }],
                model: "llama-3.3-70b-versatile",
                temperature: 1,
                max_completion_tokens: 8192,
                top_p: 1,
                stream: false,
                stop: null
            })
        });

        const data = await res.json();
        const answer = data.choices?.[0]?.message?.content || "Sin respuesta";

        isTyping.value = false;
        messages.value.push({ sender: 'bot', text: answer });
        await scrollToBottom();

    } catch (error) {
        console.error('Error al obtener la respuesta del bot:', error);
        isTyping.value = false;
        messages.value.push({ 
            sender: 'bot', 
            text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.' 
        });
        await scrollToBottom();
    }
};
</script>

<style scoped>
.message-bubble-bot {
    max-width: 80%;
}

.message-bubble-user {
    max-width: 80%;
}

.typing-indicator {
    display: flex;
    gap: 4px;
    padding: 4px 8px;
}

.typing-indicator span {
    width: 8px;
    height: 8px;
    background-color: #6c757d;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
    animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {

    0%,
    60%,
    100% {
        transform: translateY(0);
        opacity: 0.6;
    }

    30% {
        transform: translateY(-4px);
        opacity: 1;
    }
}

.avatar-xs {
    width: 24px;
    height: 24px;
    min-width: 24px;
}

.avatar-sm {
    width: 32px;
    height: 32px;
    min-width: 32px;
}
</style>