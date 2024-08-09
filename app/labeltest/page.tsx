'use client';

import React, { useState } from 'react';
import { useUserContext } from '@/context/UserContext';

const LabelTestPage: React.FC = () => {
    const [labels, setLabels] = useState<string>('');
    const { user, loading: userLoading } = useUserContext();

    const handleUpdateLabels = async () => {
        if (userLoading) {
            alert('User data is still loading...');
            return;
        }

        if (!user || !user.$id) {
            alert('User is not available');
            return;
        }

        const labelsArray = labels.split(',').map(label => label.trim());
        try {
            const response = await fetch('/api/updatelabel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.$id, labels: labelsArray }),
            });

            if (response.ok) {
                alert('Labels updated successfully!');
            } else {
                const data = await response.json();
                alert(`Failed to update labels: ${data.message}`);
            }
        } catch (error) {
            console.error('Failed to update labels:', error);
            alert('Failed to update labels');
        }
    };

    return (
        <div>
            <h2>Update User Labels</h2>
            {userLoading ? (
                <p>Loading user data...</p>
            ) : (
                <>
                    <p>User: {user.$id}</p>
                    <input
                        type="text"
                        placeholder="Labels (comma separated)"
                        value={labels}
                        onChange={(e) => setLabels(e.target.value)}
                    />
                    <button onClick={handleUpdateLabels}>Update Labels</button>
                </>
            )}
        </div>
    );
};

export default LabelTestPage;
