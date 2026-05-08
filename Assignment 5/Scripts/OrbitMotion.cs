using UnityEngine;

public class OrbitMotion : MonoBehaviour
{
    public float orbitSpeed = 20f;

    void Update()
    {
        transform.Rotate(0, orbitSpeed * Time.deltaTime, 0);
    }
}