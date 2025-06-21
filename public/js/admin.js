document.addEventListener('DOMContentLoaded', () => {
    const videoForm = document.getElementById('video-form');
    const videoList = document.getElementById('video-list');
  
    // Fetch and display videos
    fetch('/admin/videos')
      .then(response => response.json())
      .then(videos => {
        videoList.innerHTML = videos.map(video => `
          <div class="p-4 border-b">
            <h3 class="font-bold">${video.title}</h3>
            <p>Link: ${video.video_link}</p>
            <p>Type: ${video.video_type}</p>
            <p>Reward: ${video.reward_amount}</p>
          </div>
        `).join('');
      });
  
    // Handle video form submission
    videoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        email: 'admin@example.com', // Replace with logged-in admin email
        title: document.getElementById('video-title').value,
        video_link: document.getElementById('video-link').value,
        category: document.getElementById('category').value,
        tags: document.getElementById('tags').value,
        video_type: document.getElementById('video-type').value,
        reward_amount: document.getElementById('reward-amount').value,
        time_limit: document.getElementById('time-limit').value,
      };
  
      try {
        const response = await fetch('/admin/video/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(result.message);
        location.reload(); // Refresh to show new video
      } catch (error) {
        alert('Error adding video');
      }
    });
  });