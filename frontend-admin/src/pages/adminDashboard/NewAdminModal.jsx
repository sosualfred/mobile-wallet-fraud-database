import React from 'react';
import { X } from 'lucide-react'; 

const NewAdminModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">New admin</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">First name</label>
                            <input
                                type="text"
                                placeholder="e.g Isaac"
                                className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Last name</label>
                            <input
                                type="text"
                                placeholder="e.g Osei"
                                className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            placeholder="e.g isaacosei@gmail.com"
                            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone number</label>
                        <input
                            type="tel"
                            placeholder="e.g 02345xxxxx"
                            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-2">
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can approve fraud report</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can delete or remove fraud report</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can set API key usage limit</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can set domain restrictions</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can deactivate user's account</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can add or remove admins</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can set domain restrictions</label>
                        </div>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                            <label className="text-gray-700 text-sm">Can set system configuration</label>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-sm hover:bg-blue-700"
                    >
                        Add new admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewAdminModal;
