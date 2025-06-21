document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.getElementById('video-list');
    const submissionForm = document.getElementById('submission-form');
    const submitForm = document.getElementById('submit-form');
    const submitVideoId = document.getElementById('submit-video-id');
  
    // Fetch videos
    fetch('/admin/videos')
      .then(response => response.json())
      .then(videos => {
        videoList.innerHTML = videos.map(video => `
          <div class="p-4 bg-white rounded shadow-md">
            <h3 class="font-bold">${video.title}</h3>
            <p>Type: ${video.video_type}</p>
            <p>Reward: ${video.reward_amount}</p>
            <button class="bg-blue-500 text-white p-2 rounded mt-2" onclick="showSubmission(${video.id})">Watch & Submit</button>
          </div>
        `).join('');
      });
  
    window.showSubmission = (videoId) => {
      submitVideoId.value = videoId;
      submissionForm.classList.remove('hidden');
    };
  
    submitForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        user_id: 1, // Replace with actual user ID from session
        video_id: submitVideoId.value,
        screenshot_urls: document.getElementById('screenshots').value,
      };
  
      try {
        const response = await fetch('/user/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(result.message);
        submissionForm.classList.add('hidden');
      } catch (error) {
        alert('Error submitting');
      }
    });
  });