import { Plus, X } from "lucide-react";

const ApiKey = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-[600px] ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Create New API Key</h2>
                    <X className="cursor-pointer" />
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="apiKeyName" className="block text-gray-700 mb-2">API Key Name</label>
                        <input 
                            type="text" 
                            id="apiKeyName" 
                            placeholder="e.g MWFD integration" 
                            className="w-[500px] h-14 px-4 border border-gray-400 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center border border-gray-400 rounded-lg">
                        
                            <span className="px-4 text-gray-500">http://</span>
                            
                            <input 
                                type="text" 
                                id="apiUrl" 
                                placeholder="Enter URL" 
                                className="flex-grow h-14 px-4 border-l border-gray-400 outline-none"
                            />
                            <button type="button" className="px-4 text-white bg-blue-600 h- ">
                                <Plus/>
                            </button>
                        </div>




                    
                    <button className="w-full h-12 bg-blue-500 text-white rounded-lg mt-4">
                        Create Key
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKey;
