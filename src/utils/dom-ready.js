export default function DOMReady (args, callback) {
  if (document.readyState !== 'loading') {
    return callback(args)
  }

  document.addEventListener('DOMContentLoaded', () => callback(args))
}
