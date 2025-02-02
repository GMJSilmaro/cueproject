import { Video } from '@/lib/mux'

async function cleanupStreams() {
  try {
    console.log('🧹 Starting stream cleanup...')
    
    // Get all live streams
    const { data: streams } = await Video.liveStreams.list()
    console.log(`Found ${streams.length} total streams`)
    
    // Filter for non-active streams
    const inactiveStreams = streams.filter(stream => stream.status !== 'active')
    console.log(`Found ${inactiveStreams.length} inactive streams to clean up`)
    
    // Delete each inactive stream
    for (const stream of inactiveStreams) {
      console.log(`Deleting stream ${stream.id}...`)
      await Video.liveStreams.delete(stream.id)
    }
    
    console.log('✨ Stream cleanup completed successfully!')
  } catch (error) {
    console.error('Error during stream cleanup:', error)
    process.exit(1)
  }
}

// Run the cleanup
cleanupStreams() 