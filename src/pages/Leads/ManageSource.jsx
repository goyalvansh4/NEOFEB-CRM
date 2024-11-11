import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, IconButton, Card, Typography } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalAxios from './../../../Global/GlobalAxios';
import { useNavigate } from 'react-router-dom';

const ManageSource = () => {
  const [sources, setSources] = useState([]);
  const [sourceName, setSourceName] = useState('');
  const [editingSource, setEditingSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const response = await GlobalAxios.get('/lead-sources');
      setSources(response.data.data);
    } catch (error) {
      console.error('Error fetching sources:', error);
      toast.error("Failed to fetch sources.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSource = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSource) {
        await GlobalAxios.put(`/lead-sources/${editingSource.id}`, { name: sourceName });
        toast.success("Source updated successfully!");
        setEditingSource(null);
      } else {
        await GlobalAxios.post('/lead-sources', { name: sourceName });
        toast.success("Source added successfully!");
      }
      setSourceName('');
      fetchSources();
    } catch (error) {
      console.error('Error saving source:', error);
      toast.error("Failed to save source.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSource = (source) => {
    setEditingSource(source);
    setSourceName(source.name);
  };

  const handleDeleteSource = async (sourceId) => {
    setLoading(true);
    try {
      await GlobalAxios.delete(`/lead-sources/${sourceId}`);
      toast.success("Source deleted successfully!");
      fetchSources();
    } catch (error) {
      console.error('Error deleting source:', error);
      toast.error("Failed to delete source.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      <Typography variant="h3" color="blue-gray" className="text-center mb-6">
        Manage Sources
      </Typography>
      
      <form onSubmit={handleAddSource} className="flex flex-col gap-4">
        <Input
          label="Source Name"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          required
          className=""
          disabled={loading}
        />
        <div className="flex gap-2">
          <Button type="submit" color="green" disabled={loading}>
            {loading ? 'Processing...' : (editingSource ? 'Update Source' : 'Add Source')}
          </Button>
          {editingSource && (
            <Button
              type="button"
              color="red"
              onClick={() => {
                setEditingSource(null);
                setSourceName('');
              }}
              disabled={loading}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>

      <Typography variant="h5" color="blue-gray" className="mt-8 mb-4">
        All Sources
      </Typography>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      <div className="space-y-4">
        {sources.map((source) => (
          <Card key={source.id} shadow={false} className="p-4 flex justify-between items-center border border-gray-200 rounded-lg">
            <Typography variant="h5" className="text-gray-800">
              {source.name}
            </Typography>
            <div className="flex gap-2">
              <IconButton color="blue" onClick={() => handleEditSource(source)} variant="outlined" disabled={loading}>
                <PencilSquareIcon className="h-5 w-5" />
              </IconButton>
              <IconButton color="red" onClick={() => handleDeleteSource(source.id)} variant="outlined" disabled={loading}>
                <TrashIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>
      <Button color="blue" className="mt-4" onClick={()=>{navigate("/dashboard/addlead")}} >
        Back
      </Button>
    </div>
  );
};

export default ManageSource;
