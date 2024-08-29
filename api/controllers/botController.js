exports.interactWithBot = (req, res) => {
    const { message } = req.body;
    let response = 'I’m not sure how to help with that.';

    if (message.toLowerCase().includes('add task')) {
        response = 'I can add a task for you! What should the task be?';
    } else if (message.toLowerCase().includes('sync calendar')) {
        response = 'I’ll sync your tasks with Google Calendar.';
    }

    res.json({ response }); };
