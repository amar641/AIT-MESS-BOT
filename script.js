const chatBox = document.getElementById('chat-box');
const inputContainer = document.getElementById('input-container');

// Mess menu data (including all days and meals)
const messMenu = {
    Monday: {
        Breakfast: { food: "Pav Bhaji, Tea" },
        Lunch: { food: "Mix Veg, Dal Fry, Green Peas Pulao, Raita, Chapati, Fruits" },
        Snacks: { food: "Masala Pav, Tea" },
        Dinner: { food: "Matar Paneer/Palak Paneer, Dal Tadka, Plain Rice, Rice Kheer" }
    },
    Tuesday: {
        Breakfast: { food: "Poha, Black Chana/Dalia (Alternative Week), Coconut Chutney, Coffee" },
        Lunch: { food: "Rajma Masala, Aloo Bhindi Dry, Plain Rice, Curd, Salad, Chapati, Fruits" },
        Snacks: { food: "Samosa, Chutney, Tea" },
        Dinner: { food: "Chhole Masala, Dal Fry, Plain Rice, Methi Roti, Sheera" }
    },
    Wednesday: {
        Breakfast: { food: "Idli, Sambhar, Coconut Chutney (Alternative Week), Tea" },
        Lunch: { food: "Veg Biryani, Curry, Chapati, Papad, Raita, Fruits" },
        Snacks: { food: "Vada Pav, Tea" },
        Dinner: { food: "Paneer Kofta, Chicken Masala/Boiled Eggs (2 Pcs) (Alternative Week), Dal Fry, Plain Rice, Chapati, Fruit Custard" }
    },
    Thursday: {
        Breakfast: { food: "Puri Bhaji, Tea" },
        Lunch: { food: "Dal Makhni, Chana Cabbage Dry, Plain Rice, Curd, Chapati, Fruits" },
        Snacks: { food: "Poha, Chutney, Coffee" },
        Dinner: { food: "Aloo Gobhi/Veg Tawa (Alternative Week), Chana Dal Fry, Masala Rice, Chapati, Gulab Jamun" }
    },
    Friday: {
        Breakfast: { food: "Bread Butter Jam, Veg Cutlet/Boiled Eggs (2 Pcs), Tea" },
        Lunch: { food: "Aloo Matar, Dahi Kadi, Onion Pakoda (2 Pcs), Plain Rice, Salad, Roti, Fruits" },
        Snacks: { food: "Bread Pakoda, Chutney, Tea" },
        Dinner: { food: "Paneer Kadai/Egg Curry, Plain Rice, Dal Fry, Chapati, Shevai Kheer" }
    },
    Saturday: {
        Breakfast: { food: "Aloo Paratha, Curd, Tea" },
        Lunch: { food: "Methi Roti/Chhole Bhature (Alternative Week), Chhole Masala, Plain Rice, Dal Fry, Boondi Raita, Salad, Fruits" },
        Snacks: { food: "Bhel (Onion+Chilies), Coffee" },
        Dinner: { food: "Soyabean Sabzi, Masoor Dal Fry, Jeera Rice, Chapati, Kheer/Chinese Food (Chow Mein, Fried Rice, Soup)" }
    },
    Sunday: {
        Breakfast: { food: "Onion-Tomato Uttapam/Veg Upma, Sambhar, Tea" },
        Lunch: { food: "Black Chana Masala, Dal Fry, Masala Rice, Raita, Chapati, Fruits" },
        Snacks: { food: "Cream Roll, Tea" },
        Dinner: { food: "Aloo Palak/Aloo Mattar (Alternative Week), Panchratna Dal, Plain Rice, Puri/Methi Roti, Sabudana Kheer" }
    }
};

let userSelections = {};

// Append bot message
function botMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Append user message
function userMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear input container and inject new buttons
function injectButtons(buttons) {
    inputContainer.innerHTML = '';  // Clear existing buttons
    buttons.forEach(btn => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = btn.label;
        buttonElement.onclick = () => btn.callback(btn.label);
        inputContainer.appendChild(buttonElement);
    });
}

// Start the chatbot
function startChat() {
    botMessage("👋 Welcome to the Mess Menu Bot!");
    botMessage("Please select a day:");

    const dayButtons = Object.keys(messMenu).map(day => ({
        label: day,
        callback: handleDaySelection
    }));
    injectButtons(dayButtons);
}

// Handle day selection
function handleDaySelection(day) {
    userSelections.day = day;
    userMessage(day);
    botMessage(`You selected ${day}. Now choose the meal:`);

    const mealButtons = Object.keys(messMenu[day]).map(meal => ({
        label: meal,
        callback: handleMealSelection
    }));
    injectButtons(mealButtons);
}

// Handle meal selection
function handleMealSelection(meal) {
    userSelections.meal = meal;
    userMessage(meal);

    const selectedMeal = messMenu[userSelections.day][meal];
    botMessage(`Here's your ${meal}: <br><strong>${selectedMeal.food}</strong>`);

    // Offer to restart or end
    botMessage("Would you like to view another meal?");
    const restartButtons = [{ label: "Yes", callback: startChat }, { label: "No", callback: endChat }];
    injectButtons(restartButtons);
}

// End the chat
function endChat() {
    userMessage("No");
    botMessage("Thank you for using the Mess Menu Bot. Have a great day!");
    inputContainer.innerHTML = '';  // Clear buttons
}

// Initialize chat on page load
startChat();
