
const providers = {
    MTN: ['024', '054', '059', '055', '053', '025'],
    AirTelTigo: ['027', '057', '026', '056'],
    Telecel: ['020', '050']
};

const detectNetworkProvider = (phoneNumber) => {
    // Remove country code (+233) if present
    if (phoneNumber.startsWith('+233')) {
        phoneNumber = '0' + phoneNumber.slice(4);
    } else if (phoneNumber.startsWith('233')) {
        phoneNumber = '0' + phoneNumber.slice(3);
    }

    // Validate format (must be exactly 10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
        return { error: 'Invalid phone number format' };
    }

    // Check for network provider based on the prefix
    const prefix = phoneNumber.slice(0, 3);
    for (const [provider, prefixes] of Object.entries(providers)) {
        if (prefixes.includes(prefix)) {
            return { provider, message: `Network provider: ${provider}` };
        }
    }

    // If no provider matches the prefix
    return { error: 'Unknown network provider' };
};

export const getNetworkProvider = (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    const result = detectNetworkProvider(phoneNumber);
    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    return res.status(200).json(result);
};

// export const getNetworkProvider = async (req, res) => {
//     try {
//         const { phoneNumber } = req.query;
//         if (!phoneNumber) {
//             return res.status(400).json({ message: 'Phone number is required' });
//         }

//         const result = await detectNetworkProvider(phoneNumber);

//         if (result.error) {
//             return res.status(400).json({ message: result.error });
//         }

//         return res.status(200).json(result);
//     } catch (error) {
//         console.error(error);  // Add more detailed logging
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };


const MAX_REPORTS = 5; // Maximum allowed reports within the time window
const TIME_WINDOW = 60 * 60 * 1000; // Time window in milliseconds (1 hour)


// Helper function to validate phone number format
const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
        return null; // Return null if phoneNumber is undefined or empty
    }

    if (phoneNumber.startsWith('+233')) {
        phoneNumber = '0' + phoneNumber.slice(4);
    } else if (phoneNumber.startsWith('233')) {
        phoneNumber = '0' + phoneNumber.slice(3);
    }
    return /^\d{10}$/.test(phoneNumber) ? phoneNumber : null;
};

// Function to check the report limit for a specific phone number
const checkReportLimit = (phoneNumber) => {
    // Initialize report data if phone number hasn't been reported before
    if (!reportData[phoneNumber]) {
        reportData[phoneNumber] = [];
    }

    const currentTime = Date.now();

    // Clean up old reports outside the time window
    reportData[phoneNumber] = reportData[phoneNumber].filter(
        reportTime => currentTime - reportTime <= TIME_WINDOW
    );

    // Check if the report count exceeds the limit
    const currentCount = reportData[phoneNumber].length;
    if (currentCount >= MAX_REPORTS) {
        return { error: 'Rate limit exceeded' };
    }

    // Add new report timestamp
    reportData[phoneNumber].push(currentTime);

    // Return current report count and limit status
    return {
        current_report_count: currentCount + 1,
        limit_reached: currentCount + 1 >= MAX_REPORTS
    };
};
export const checkLimitEndpoint = async (req, res) => {
    let { phoneNumber } = req.query;

    // Check if phoneNumber is provided in the request query
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    // Validate phone number
    phoneNumber = validatePhoneNumber(phoneNumber);
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Invalid phone number' });
    }

    try {
        // Check report limit for the phone number
        const result = checkReportLimit(phoneNumber);
        if (result.error) {
            return res.status(429).json({ message: result.error });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error checking report limit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
