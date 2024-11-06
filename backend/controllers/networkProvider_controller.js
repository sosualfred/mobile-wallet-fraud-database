
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


